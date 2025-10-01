package com.example.memorials.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = {"*"})
public class InquiryController {

    // Make it optional: if mail starter isn’t present, this will be null
    @Autowired(required = false)
    @Nullable
    private JavaMailSender mailSender;

    @Value("${app.inquiry.mail.to:}")
    private String toAddress;

    @Value("${app.inquiry.mail.from:}")
    private String fromAddress;

    @PostMapping
    public Map<String, String> submit(@RequestBody Map<String, Object> payload) {
        // Build body
        StringBuilder body = new StringBuilder("New inquiry received:\n\n");
        payload.forEach((k, v) -> body.append(k).append(": ").append(v).append("\n"));

        // If mailSender is available AND config is set, send the email; otherwise just log.
        if (mailSender != null && !toAddress.isBlank() && !fromAddress.isBlank()) {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(toAddress);
            msg.setFrom(fromAddress);
            msg.setSubject("[INQUIRY] " + String.valueOf(payload.getOrDefault("contactOrSample", "")));
            msg.setText(body.toString());
            mailSender.send(msg);
            return Map.of("status", "accepted", "delivery", "email");
        } else {
            System.out.println("=== Inquiry (mail disabled or not configured) ===");
            System.out.println(body);
            return Map.of("status", "accepted", "delivery", "logged");
        }
    }
}