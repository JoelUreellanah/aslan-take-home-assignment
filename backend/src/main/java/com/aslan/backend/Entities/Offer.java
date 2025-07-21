package com.aslan.backend.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Offer {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID id;

    @OneToOne(mappedBy = "offer")
    private Product product;

    private String description;
    private Double discountAmount;
    private Boolean isPercentage;
}
