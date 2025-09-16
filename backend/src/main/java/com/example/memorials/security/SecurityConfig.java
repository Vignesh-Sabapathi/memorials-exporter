package com.example.memorials.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AdminTokenFilter adminTokenFilter) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.cors(Customizer.withDefaults());
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/**").authenticated()
                .requestMatchers("/api/images/**").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/actuator/health", "/").permitAll()
                .anyRequest().permitAll()
        );
        http.addFilterBefore(adminTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}

@Component
class AdminTokenFilter extends OncePerRequestFilter {

    private final String mode;
    private final String adminToken;

    public AdminTokenFilter(
            @Value("${app.auth.mode:DEV}") String mode,
            @Value("${app.admin.token:changeme}") String adminToken
    ) {
        this.mode = mode;
        this.adminToken = adminToken;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        if (!path.startsWith("/api/admin")) {
            filterChain.doFilter(request, response);
            return;
        }

        if ("DEV".equalsIgnoreCase(mode)) {
            String token = request.getHeader("X-Admin-Token");
            if (token != null && token.equals(adminToken)) {
                AbstractAuthenticationToken auth = new AbstractAuthenticationToken(List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
                    @Override public Object getCredentials() { return null; }
                    @Override public Object getPrincipal() { return "admin"; }
                };
                auth.setAuthenticated(true);
                SecurityContextHolder.getContext().setAuthentication(auth);
                filterChain.doFilter(request, response);
                return;
            } else {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Unauthorized: Missing or invalid X-Admin-Token");
                return;
            }
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write("Unauthorized: non-DEV auth mode not configured");
    }
}
