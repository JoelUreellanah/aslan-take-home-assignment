package com.aslan.backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDto {
    private UUID id;
    private String name;
    private String imageUrl;
    private boolean wishListed;
    private OfferDto offer;
    private String googleShoppingLink;
    private Instant createdAt;
}
