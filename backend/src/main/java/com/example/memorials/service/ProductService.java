package com.example.memorials.service;

import com.example.memorials.dto.ProductDto;
import com.example.memorials.model.Product;
import com.example.memorials.repo.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<ProductDto> list() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public ProductDto get(Long id) {
        return repo.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional
    public ProductDto create(ProductDto dto) {
        Product p = new Product();
        apply(p, dto);
        return toDto(repo.save(p));
    }

    @Transactional
    public ProductDto update(Long id, ProductDto dto) {
        Product p = repo.findById(id).orElseThrow();
        apply(p, dto);
        return toDto(repo.save(p));
    }

    @Transactional
    public void delete(Long id) {
        repo.deleteById(id);
    }

    private void apply(Product p, ProductDto dto) {
        p.setName(dto.name);
        p.setDescription(dto.description);
        p.setCategory(dto.category);
        p.setPrice(dto.price);
        p.setImageKeys(dto.imageKeys == null ? java.util.List.of() : dto.imageKeys);
    }

    private ProductDto toDto(Product p) {
        ProductDto dto = new ProductDto();
        dto.id = p.getId();
        dto.name = p.getName();
        dto.description = p.getDescription();
        dto.category = p.getCategory();
        dto.price = p.getPrice();
        dto.imageKeys = p.getImageKeys();
        return dto;
    }
}
