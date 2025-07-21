package com.aslan.backend.Services;

import com.aslan.backend.Dtos.OfferDto;
import com.aslan.backend.Dtos.ProductListResponseDto;
import com.aslan.backend.Dtos.ProductRequestDto;
import com.aslan.backend.Dtos.ProductResponseDto;
import com.aslan.backend.Entities.Offer;
import com.aslan.backend.Entities.Product;
import com.aslan.backend.Enums.SortBy;
import com.aslan.backend.Exceptions.NotFoundException;
import com.aslan.backend.Repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

        private final ProductRepository productRepository;
        private final UnsplashService unsplashService;

        @Value("${google.shopping.link}")
        private String googleShoppingLink;

        public ProductListResponseDto getAll(String nameFilter, String sortByRaw, Boolean isWishlist) {
                SortBy sortBy = SortBy.from(sortByRaw);

                List<Product> products;

                // Apply database-level filters
                if (nameFilter != null && !nameFilter.isBlank()) {
                        if (isWishlist != null) {
                                products = productRepository.findByNameContainingIgnoreCaseAndWishListed(nameFilter,
                                                isWishlist);
                        } else {
                                products = productRepository.findByNameContainingIgnoreCase(nameFilter);
                        }
                } else {
                        if (isWishlist != null) {
                                products = productRepository.findByWishListed(isWishlist);
                        } else {
                                products = productRepository.findAll();
                        }
                }
                if (products.isEmpty()) {
                        return ProductListResponseDto.builder()
                                        .products(List.of())
                                        .total(0)
                                        .build();
                }
                // Apply sorting
                if (sortBy == SortBy.NEWEST) {
                        products.sort(Comparator.comparing(Product::getCreatedAt).reversed());
                } else if (sortBy == SortBy.OLDEST) {
                        products.sort(Comparator.comparing(Product::getCreatedAt));
                }

                List<ProductResponseDto> productDtos = products.stream()
                                .map(this::toDto)
                                .toList();

                return ProductListResponseDto.builder()
                                .products(productDtos)
                                .total(productDtos.size())
                                .build();
        }

        public ProductResponseDto addProduct(ProductRequestDto request) {
                String imageUrl;
                try {
                        imageUrl = unsplashService.fetchImageUrl(request.getName()).get();
                } catch (Exception e) {
                        throw new RuntimeException("Failed to fetch image URL", e);
                }

                Offer offer = null;
                if (request.getOffer() != null) {
                        offer = Offer.builder()
                                        .description(request.getOffer().getDescription())
                                        .discountAmount(request.getOffer().getDiscountAmount())
                                        .isPercentage(request.getOffer().getIsPercentage())
                                        .build();
                }

                Product product = Product.builder()
                                .name(request.getName())
                                .imageUrl(imageUrl)
                                .offer(offer)
                                .build();

                return toDto(productRepository.save(product));
        }

        @Transactional
        public ProductResponseDto toggleWishlist(UUID id) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Product with ID " + id + " not found"));
                product.setWishListed(!product.isWishListed());
                return toDto(productRepository.save(product));
        }

        private ProductResponseDto toDto(Product product) {
                Offer offer = product.getOffer();
                OfferDto offerDTO = (offer != null)
                                ? OfferDto.builder()
                                                .description(offer.getDescription())
                                                .discountAmount(offer.getDiscountAmount())
                                                .isPercentage(offer.getIsPercentage())
                                                .build()
                                : null;

                return ProductResponseDto.builder()
                                .id(product.getId())
                                .name(product.getName())
                                .imageUrl(product.getImageUrl())
                                .wishListed(product.isWishListed())
                                .createdAt(product.getCreatedAt())
                                .offer(offerDTO)
                                .googleShoppingLink(googleShoppingLink + product.getName().replace(" ", "+"))
                                .build();
        }
}
