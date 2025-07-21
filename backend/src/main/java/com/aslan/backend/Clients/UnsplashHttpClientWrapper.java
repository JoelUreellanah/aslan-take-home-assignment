package com.aslan.backend.Clients;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.Request;

public class UnsplashHttpClientWrapper {
    private final HttpClient httpClient;
    private final String baseUrl;

    public UnsplashHttpClientWrapper(HttpClient httpClient, String baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }

    public Request getRequest(String pathWithQuery) {
        return httpClient.newRequest(baseUrl + pathWithQuery).method("GET");
    }
}
