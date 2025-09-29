package com.example.memorials.service;


import com.example.memorials.dto.ProductDto;
import com.example.memorials.model.Product;
import com.example.memorials.model.ProductImage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    @Value("${app.storage.s3.bucket}")
    private String bucket;

    @Value("${app.storage.s3.region}")
    private String region;

    @Value("${app.cdn.domain:}")
    private String cdnDomain;

    private String buildUrl(String key) {
        if (cdnDomain != null && !cdnDomain.isBlank()) {
            return "https://" + cdnDomain + "/" + key;
        }
        return "https://" + bucket + ".s3." + region + ".amazonaws.com/" + key;
    }

    public ProductDto toDto(Product p) {
        ProductDto dto = new ProductDto();
        dto.id = p.getId();
        dto.name = p.getName();
        dto.description = p.getDescription();
        dto.priceCents = p.getPriceCents();
        dto.createdAt = p.getCreatedAt() != null ? p.getCreatedAt().toString() : null;
        dto.imageUrls = p.getImages().stream()
                .map(ProductImage::getS3Key)
                .map(this::buildUrl)
                .toList();
        return dto;
    }

    public List<ProductDto> toDtos(List<Product> products) {
        return products.stream().map(this::toDto).toList();
    }
}
