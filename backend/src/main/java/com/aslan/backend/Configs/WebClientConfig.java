package com.aslan.backend.Configs;

import com.aslan.backend.Clients.UnsplashHttpClientWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.eclipse.jetty.client.HttpClient;

@Configuration
public class WebClientConfig {
    @Value("${unsplash.api.url}")
    private String unsplashApiUrl;

    @Bean
    public HttpClient httpClient() {
        try {
            HttpClient httpClient = new HttpClient();
            httpClient.setConnectTimeout(3000);
            httpClient.start();

            return httpClient;
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize Jetty HTTP client", e);
        }
    }

    @Bean
    public UnsplashHttpClientWrapper unsplashClient(HttpClient unsplashHttpClient) {
        return new UnsplashHttpClientWrapper(unsplashHttpClient, unsplashApiUrl);
    }
}
