package com.aslan.backend.Services;

import com.aslan.backend.Entities.Offer;
import com.aslan.backend.Repositories.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OfferService {
    private final OfferRepository offerRepository;

    public List<Offer> saveAll(List<Offer> offers) {
        return offerRepository.saveAll(offers);
    }

    public List<Offer> getByProductId(UUID productId) {
        return offerRepository.findByProductId(productId);
    }
}
