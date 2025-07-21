package com.aslan.backend.unit.Services;

import com.aslan.backend.Dtos.*;
import com.aslan.backend.Entities.*;
import com.aslan.backend.Exceptions.NotFoundException;
import com.aslan.backend.Repositories.ProductRepository;
import com.aslan.backend.Services.ProductService;
import com.aslan.backend.Services.UnsplashService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UnsplashService unsplashService;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        // Set private field (googleShoppingLink) using reflection since it's injected
        // with @Value
        try {
            var field = ProductService.class.getDeclaredField("googleShoppingLink");
            field.setAccessible(true);
            field.set(productService, "https://shopping.google.com/search?q=");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void getAll_returnsFilteredAndSortedProducts() {
        Product product1 = Product.builder()
                .id(UUID.randomUUID())
                .name("Shoes")
                .createdAt(Instant.parse("2023-01-01T00:00:00Z"))
                .build();
        Product product2 = Product.builder()
                .id(UUID.randomUUID())
                .name("Shirt")
                .createdAt(Instant.parse("2024-01-01T00:00:00Z"))
                .build();

        when(productRepository.findAll()).thenReturn(new ArrayList<>(List.of(product1, product2)));

        ProductListResponseDto response = productService.getAll(null, "newest", null);

        assertEquals(2, response.getProducts().size());
        assertEquals("Shirt", response.getProducts().get(0).getName());
    }

    @Test
    void addProduct_savesProductWithImageUrl() throws Exception {
        ProductRequestDto request = ProductRequestDto.builder()
                .name("Backpack")
                .build();

        when(unsplashService.fetchImageUrl("Backpack"))
                .thenReturn(CompletableFuture.completedFuture("http://image.com/backpack.jpg"));

        Product savedProduct = Product.builder()
                .id(UUID.randomUUID())
                .name("Backpack")
                .imageUrl("http://image.com/backpack.jpg")
                .createdAt(Instant.now())
                .build();

        when(productRepository.save(any())).thenReturn(savedProduct);

        ProductResponseDto response = productService.addProduct(request);

        assertEquals("Backpack", response.getName());
        assertEquals("http://image.com/backpack.jpg", response.getImageUrl());
        assertTrue(response.getGoogleShoppingLink().contains("Backpack"));
    }

    @Test
    void toggleWishlist_flipsWishlistFlag() {
        UUID id = UUID.randomUUID();
        Product existing = Product.builder()
                .id(id)
                .name("Hat")
                .wishListed(false)
                .build();

        when(productRepository.findById(id)).thenReturn(Optional.of(existing));
        when(productRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        ProductResponseDto response = productService.toggleWishlist(id);

        assertTrue(response.isWishListed());
        verify(productRepository).save(existing);
    }

    @Test
    void toggleWishlist_throwsIfNotFound() {
        UUID id = UUID.randomUUID();
        when(productRepository.findById(id)).thenReturn(Optional.empty());

        NotFoundException ex = assertThrows(NotFoundException.class, () -> {
            productService.toggleWishlist(id);
        });

        assertTrue(ex.getMessage().contains("Product with ID"));
    }
}
