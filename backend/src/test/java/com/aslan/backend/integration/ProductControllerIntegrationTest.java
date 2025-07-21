package com.aslan.backend.integration;

import com.aslan.backend.Dtos.ProductRequestDto;
import com.aslan.backend.Dtos.ProductResponseDto;
import com.aslan.backend.Repositories.ProductRepository;
import com.aslan.backend.Services.UnsplashService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UnsplashService unsplashService;

    @BeforeEach
    void setup() {
        productRepository.deleteAll();

        when(unsplashService.fetchImageUrl(anyString()))
                .thenReturn(CompletableFuture.completedFuture("http://mocked-image-url.com"));
    }

    @Test
    void createProduct_thenGetAll_thenToggleWishlist() throws Exception {
        // 1. Create a new product
        ProductRequestDto requestDto = ProductRequestDto.builder()
                .name("Test Widget")
                .build();

        String jsonRequest = objectMapper.writeValueAsString(requestDto);

        String responseBody = mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Widget"))
                .andReturn().getResponse().getContentAsString();

        ProductResponseDto responseDto = objectMapper.readValue(responseBody, ProductResponseDto.class);
        UUID productId = responseDto.getId();


        // 2. Get all products
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total", is(1)))
                .andExpect(jsonPath("$.products[0].name", is("Test Widget")));

        // 3. Toggle wishlist
        mockMvc.perform(patch("/api/products/" + productId + "/wishlist"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.wishListed", is(true)));
    }
}
