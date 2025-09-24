package com.example.memorials.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;

    private String name;

    public void setDescription(String description) {
        this.description = description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setImageKeys(List<String> imageKeys) {
        this.imageKeys = imageKeys;
    }

    private String description;
    private String sku;

    public Double getPrice() {
        return price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getSku() {
        return sku;
    }

    public List<String> getImageKeys() {
        return imageKeys;
    }

    private Double price;

    @ElementCollection
    private List<String> imageKeys = new ArrayList<>();

    public Product() {}
}
