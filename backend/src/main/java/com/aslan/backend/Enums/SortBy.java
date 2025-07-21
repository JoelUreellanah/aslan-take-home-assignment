package com.aslan.backend.Enums;

public enum SortBy {
    NEWEST,
    OLDEST;

    public static SortBy from(String value) {
        if (value == null)
            return null;
        try {
            return SortBy.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return null; // or throw if you prefer
        }
    }
}
