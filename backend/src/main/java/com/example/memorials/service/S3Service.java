package com.example.memorials.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.time.Duration;

@Service
public class S3Service {
    private final S3Presigner presigner;
    private final String bucket;

    public S3Service(@Value("${app.s3.region}") String region,
                     @Value("${app.s3.bucket}") String bucket) {
        this.bucket = bucket;
        this.presigner = S3Presigner.builder()
                .region(Region.of(region))
                .build();
    }

    public String getPresignedUrl(String key) {
        GetObjectRequest getReq = GetObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();
        GetObjectPresignRequest presignReq = GetObjectPresignRequest.builder()
                .getObjectRequest(getReq)
                .signatureDuration(Duration.ofMinutes(15))
                .build();
        return presigner.presignGetObject(presignReq).url().toString();
    }
}