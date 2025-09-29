package com.example.memorials.repo;

import com.example.memorials.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @EntityGraph(attributePaths = {"images"})
    List<Product> findByIsActiveTrueOrderByCreatedAtDesc(Pageable pageable);

    @EntityGraph(attributePaths = {"images"})
    List<Product> findByIsActiveTrueOrderByCreatedAtDesc();
}
