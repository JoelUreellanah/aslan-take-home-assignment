package com.aslan.backend.Repositories;

import com.aslan.backend.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    // Custom query to search by product name (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // name + wishListed
    List<Product> findByNameContainingIgnoreCaseAndWishListed(String name, boolean wishListed);

    // wishListed only
    List<Product> findByWishListed(boolean wishListed);
}
