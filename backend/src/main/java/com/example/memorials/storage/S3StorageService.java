package com.example.memorials.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3ClientBuilder;
import software.amazon.awssdk.services.s3.model.*;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@Service
public class S3StorageService implements StorageService {

    private final S3Client s3;
    private final String bucket;

    public S3StorageService(
            @Value("${app.storage.s3.bucket:}") String bucket,
            @Value("${app.storage.s3.region:eu-west-2}") String region,
            @Value("${app.storage.s3.endpoint:}") String endpoint
    ) {
        this.bucket = bucket;
        S3ClientBuilder builder = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(DefaultCredentialsProvider.create());
        if (endpoint != null && !endpoint.isBlank()) {
            builder = builder.endpointOverride(URI.create(endpoint));
        }
        this.s3 = builder.build();
    }

    @Override
    public String save(MultipartFile file) throws IOException {
        if (bucket == null || bucket.isBlank()) {
            throw new IllegalStateException("S3 bucket not configured. Set app.storage.s3.bucket");
        }
        String filename = file.getOriginalFilename() == null ? "file" : file.getOriginalFilename();
        String key = "products/" + UUID.randomUUID() + (filename.contains(".") ? filename.substring(filename.lastIndexOf(".")) : "");
        PutObjectRequest req = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(file.getContentType())
                .build();
        s3.putObject(req, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        return key;
    }

    @Override
    public Optional<byte[]> load(String key) throws IOException {
        if (bucket == null || bucket.isBlank()) return Optional.empty();
        try {
            GetObjectRequest get = GetObjectRequest.builder().bucket(bucket).key(key).build();
            ResponseBytes<GetObjectResponse> bytes = s3.getObjectAsBytes(get);
            return Optional.of(bytes.asByteArray());
        } catch (NoSuchKeyException e) {
            return Optional.empty();
        }
    }

    @Override
    public String contentType(String key) {
        try {
            HeadObjectResponse head = s3.headObject(HeadObjectRequest.builder().bucket(bucket).key(key).build());
            return head.contentType();
        } catch (S3Exception e) {
            return "application/octet-stream";
        }
    }

    @Override
    public void delete(String key) throws IOException {
        if (bucket == null || bucket.isBlank()) return;
        s3.deleteObject(DeleteObjectRequest.builder().bucket(bucket).key(key).build());
    }
}
