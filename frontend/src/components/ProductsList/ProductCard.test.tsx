import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import wishlistReducer from "@/redux/wishlistProduct";

const mockProduct: Product = {
  id: "v-001",
  name: "Guitar",
  imageUrl: "https://picsum.photos/300/200",
  createdAt: "2025-03-10T12:00:00Z",
  googleShoppingLink: "https://shopping.google.com/search?q=Guitar",
  wishListed: false,
  offer: null,
};

const createTestStore = () =>
  configureStore({
    reducer: {
      wishlist: wishlistReducer,
    },
  });

function renderWithProvider(ui: React.ReactElement) {
  const store = createTestStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("ProductCard component", () => {
  it("renders product name", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it("renders product image", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    const image = screen.getByRole("img", { name: mockProduct.name });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", mockProduct.name);
  });

  it("renders correct creation date", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    const formattedDate = new Date(mockProduct.createdAt).toLocaleDateString(
      "en-NL"
    );
    expect(
      screen.getByText(`Uploaded on: ${formattedDate}`)
    ).toBeInTheDocument();
  });
});
