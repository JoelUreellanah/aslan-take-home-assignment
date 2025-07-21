import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductsList from "./ProductsList";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import wishlistReducer from "@/redux/wishlistProduct";

vi.mock("@/hooks/useProducts", () => ({
  default: vi.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "v-001",
    name: "Guitar",
    imageUrl: "https://picsum.photos/300/200",
    createdAt: "2025-03-10T12:00:00Z",
    googleShoppingLink: "https://shopping.google.com/search?q=Guitar",
    wishListed: false,
    offer: null,
  },
  {
    id: "v-002",
    name: "Laptops",
    imageUrl: "https://picsum.photos/300/200",
    createdAt: "2025-03-10T12:00:00Z",
    googleShoppingLink: "https://shopping.google.com/search?q=Laptops",
    wishListed: false,
    offer: null,
  },
];

const mockGlobalReducer = () => ({
  isWishlistFilterActive: false,
});

const createTestStore = () =>
  configureStore({
    reducer: {
      wishlist: wishlistReducer,
      global: () => mockGlobalReducer(), // Add this line
    },
  });

function renderWithProvider(ui: React.ReactElement) {
  const store = createTestStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("ProductsList component", () => {
  it("renders loading state", () => {
    vi.mocked(useProducts).mockReturnValue({
      total: 0,
      loading: true,
      products: [],
      error: null,
    });

    renderWithProvider(<ProductsList />);
    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useProducts).mockReturnValue({
      total: 0,
      loading: false,
      products: [],
      error: "Network Error",
    });

    renderWithProvider(<ProductsList />);
    expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
  });

  it('renders "No products found" message when no products exist', () => {
    vi.mocked(useProducts).mockReturnValue({
      total: 0,
      loading: false,
      products: [],
      error: null,
    });

    renderWithProvider(<ProductsList />);
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it("renders product list correctly", () => {
    vi.mocked(useProducts).mockReturnValue({
      total: mockProducts.length,
      loading: false,
      products: mockProducts,
      error: null,
    });

    renderWithProvider(<ProductsList />);
    expect(screen.getByText(/Guitar/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptops/i)).toBeInTheDocument();
  });

  it("renders the correct number of products", () => {
    vi.mocked(useProducts).mockReturnValue({
      total: mockProducts.length,
      loading: false,
      products: mockProducts,
      error: null,
    });

    renderWithProvider(<ProductsList />);
    const productCards = screen.getAllByRole("article");
    expect(productCards.length).toBe(mockProducts.length);
  });
});
