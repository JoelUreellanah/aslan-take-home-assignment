import { describe, it, expect } from "vitest";
import { fetchProducts, ProductsState, setQuery } from "@/redux/productsSlice";
import productsReducer from "@/redux/productsSlice";

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  query: { search: "", sortBy: "newest" },
};

const mockProducts = [
  {
    id: "v-001",
    name: "Guitar",
    imageUrl: "https://picsum.photos/300/200",
    createdAt: "2025-03-10T12:00:00Z",
    googleShoppingLink: "https://shopping.google.com/search?q=Guitar",
    wishListed: false,
    offer: null,
  },
];

describe("productsSlice reducer", () => {
  it("should return the initial state", () => {
    const state = productsReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should handle fetchProducts.pending", () => {
    const state = productsReducer(initialState, {
      type: fetchProducts.pending.type,
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchProducts.fulfilled", () => {
    const state = productsReducer(initialState, {
      type: fetchProducts.fulfilled.type,
      payload: { products: mockProducts, total: 1 },
    });

    expect(state.loading).toBe(false);
    expect(state.products).toEqual(mockProducts);
    expect(state.total).toBe(1);
    expect(state.error).toBe(null);
  });

  it("should handle fetchProducts.rejected", () => {
    const errorMessage = "Failed to fetch products";
    const state = productsReducer(initialState, {
      type: fetchProducts.rejected.type,
      error: { message: errorMessage },
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.products).toEqual([]);
  });

  it("should update query when setQuery is called", () => {
    const newQuery = { search: "React", page: 2, pageSize: 5 };
    const state = productsReducer(initialState, setQuery(newQuery));

    expect(state.query.search).toBe("React");
  });
});
