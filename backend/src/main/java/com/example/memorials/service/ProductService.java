package com.example.memorials.service;


import com.example.memorials.dto.ProductDto;
import com.example.memorials.model.Product;
import com.example.memorials.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;
    private final ProductMapper mapper;

    @Value("${app.products.first-count:15}")
    private int firstCount;

    @Value("${app.products.max-all:125}")
    private int maxAll;

    public ProductService(ProductRepository repo, ProductMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<ProductDto> getFirstProducts() {
        List<Product> list = repo.findByIsActiveTrueOrderByCreatedAtDesc(PageRequest.of(0, firstCount));
        return mapper.toDtos(list);
    }

    public List<ProductDto> getAllCapped(Integer limitParam) {
        int limit = limitParam == null ? maxAll : Math.min(limitParam, maxAll);
        List<Product> list = repo.findByIsActiveTrueOrderByCreatedAtDesc(PageRequest.of(0, limit));
        return mapper.toDtos(list);
    }
}

