package com.example.memorials.service;

import com.example.memorials.dto.ProductDto;
import com.example.memorials.model.Product;
import com.example.memorials.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;
    private final S3Service s3;

    public ProductService(ProductRepository repo, S3Service s3) {
        this.repo = repo;
        this.s3 = s3;
    }

    public List<ProductDto> list() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    public ProductDto get(Long id) {
        return repo.findById(id).map(this::toDto).orElseThrow();
    }

    private ProductDto toDto(Product p) {
        ProductDto dto = new ProductDto();
        dto.id = p.getId();
        dto.name = p.getName();
        dto.description = p.getDescription();
        dto.sku = p.getSku();
        dto.price = p.getPrice();
        dto.imageUrls = p.getImageKeys().stream()
                .map(s3::getPresignedUrl)
                .toList();
        return dto;
    }

    public ProductDto create(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.name);
        product.setDescription(dto.description);
        product.setSku(dto.sku);
        product.setPrice(dto.price);
        product.setImageKeys(dto.imageUrls); // or dto.imageKeys
        product = repo.save(product);
        return toDto(product);
    }

    public ProductDto update(Long id, ProductDto dto) {
        Product product = repo.findById(id).orElseThrow();
        product.setName(dto.name);
        product.setDescription(dto.description);
        product.setSku(dto.sku);
        product.setPrice(dto.price);
        product.setImageKeys(dto.imageUrls); // or dto.imageKeys
        product = repo.save(product);
        return toDto(product);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
