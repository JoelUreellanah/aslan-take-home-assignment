package com.aslan.backend.unit.Controllers;

import com.aslan.backend.Controllers.ProductController;
import com.aslan.backend.Dtos.*;
import com.aslan.backend.Services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private ProductResponseDto sampleProduct;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        sampleProduct = ProductResponseDto.builder()
                .id(UUID.randomUUID())
                .name("Test Product")
                .imageUrl("http://image.com/test.jpg")
                .wishListed(false)
                .createdAt(Instant.now())
                .googleShoppingLink("https://shopping.google.com/search?q=Test+Product")
                .build();
    }

    @Test
    void getAllProducts_shouldReturnProductList() {
        ProductListResponseDto responseDto = ProductListResponseDto.builder()
                .products(List.of(sampleProduct))
                .total(1)
                .build();

        when(productService.getAll("Test", "newest", false)).thenReturn(responseDto);

        ResponseEntity<ProductListResponseDto> response = productController.getAllProducts("Test", "newest", false);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        ProductListResponseDto body = response.getBody();
        assertNotNull(body);
        assertEquals(1, body.getTotal());
        assertEquals("Test Product", body.getProducts().get(0).getName());
    }

    @Test
    void createProduct_shouldReturnCreatedProduct() {
        ProductRequestDto requestDto = ProductRequestDto.builder()
                .name("Test Product")
                .build();

        when(productService.addProduct(requestDto)).thenReturn(sampleProduct);

        ResponseEntity<ProductResponseDto> response = productController.createProduct(requestDto);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        ProductResponseDto responseBody = response.getBody();
        assertNotNull(responseBody);
        assertEquals("Test Product", responseBody.getName());
    }

    @Test
    void toggleWishlist_shouldFlipWishlistFlag() {
        UUID productId = UUID.randomUUID();
        sampleProduct.setWishListed(true);

        when(productService.toggleWishlist(productId)).thenReturn(sampleProduct);

        ResponseEntity<ProductResponseDto> response = productController.toggleWishlist(productId);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        ProductResponseDto responseBody = response.getBody();
        assertNotNull(responseBody);
        assertTrue(responseBody.isWishListed());
    }
}
