package com.example.memorials.controller;

import com.example.memorials.dto.ProductDto;
import com.example.memorials.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class PublicController {

    private final ProductService service;

    public PublicController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public ProductDto get(@PathVariable Long id) {
        return service.get(id);
    }
}
