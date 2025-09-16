package com.example.memorials.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class StorageConfig {

    @Bean
    @Primary
    public StorageService storageService(
            @Value("${app.storage.mode:LOCAL}") String mode,
            LocalStorageService local,
            S3StorageService s3
    ) {
        if ("S3".equalsIgnoreCase(mode)) {
            return s3;
        }
        return local;
    }
}
