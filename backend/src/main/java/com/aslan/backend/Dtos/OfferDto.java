package com.aslan.backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OfferDto {
    private String description;
    private Double discountAmount;
    private Boolean isPercentage;
}
