package com.aslan.backend.Controllers;

import com.aslan.backend.Dtos.ProductListResponseDto;
import com.aslan.backend.Dtos.ProductRequestDto;
import com.aslan.backend.Dtos.ProductResponseDto;
import com.aslan.backend.Services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin // enable CORS for frontend
public class ProductController {

    private final ProductService productService;

    // Get all products, optionally filtered by name
    @GetMapping
    public ResponseEntity<ProductListResponseDto> getAllProducts(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "isWishlist", required = false) Boolean isWishlist) {
        return ResponseEntity.ok(productService.getAll(search, sortBy, isWishlist));
    }

    // Create a new product with offers
    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(@RequestBody ProductRequestDto request) {
        return ResponseEntity.ok(productService.addProduct(request));
    }

    // Toggle wishlist status for a product
    @PatchMapping("/{id}/wishlist")
    public ResponseEntity<ProductResponseDto> toggleWishlist(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.toggleWishlist(id));
    }
}
