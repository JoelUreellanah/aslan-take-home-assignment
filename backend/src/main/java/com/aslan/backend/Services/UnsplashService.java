package com.aslan.backend.Services;

import com.aslan.backend.Clients.UnsplashHttpClientWrapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.eclipse.jetty.client.api.ContentResponse;
import org.eclipse.jetty.http.HttpHeader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UnsplashService {

    @Value("${unsplash.api.key}")
    private String unsplashApiKey;

    private final UnsplashHttpClientWrapper unsplashClient;

    public CompletableFuture<String> fetchImageUrl(String query) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
                String path = "/photos/random?query=" + encodedQuery;

                ContentResponse response = unsplashClient.getRequest(path)
                        .headers(headers -> headers.add(HttpHeader.AUTHORIZATION, "Client-ID " + unsplashApiKey))
                        .timeout(3, TimeUnit.SECONDS).send();

                String json = response.getContentAsString();
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(json);

                JsonNode regularUrlNode = root.path("urls").path("regular");

                if (regularUrlNode.isMissingNode() || regularUrlNode.asText().isEmpty()) {
                    throw new RuntimeException("Image URL not found");
                }

                return regularUrlNode.asText().replace("\\u0026", "&");

            } catch (Exception e) {
                return "https://via.placeholder.com/400?text=" + query;
            }
        });
    }
}
