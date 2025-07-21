import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchProducts } from "@/redux/productsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useProducts from "@/hooks/useProducts";

// Mock Redux Hooks
vi.mock("@/hooks/reduxHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("@/redux/productsSlice", () => ({
  fetchProducts: vi.fn(),
}));

describe("useProducts hook", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue({
      products: [],
      total: 0,
      loading: false,
      error: null,
    });

    mockDispatch.mockClear();
  });

  it("dispatches fetchProducts on mount", () => {
    renderHook(() => useProducts());
    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts());
  });

  it("returns correct Redux state", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      products: [{ id: "v-001", name: "Guitar" }],
      total: 1,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useProducts());
    expect(result.current.products).toEqual([{ id: "v-001", name: "Guitar" }]);
    expect(result.current.total).toBe(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("does not dispatch fetchProducts if query does not change", () => {
    const { rerender } = renderHook(() => useProducts());
    mockDispatch.mockClear();
    rerender(); // Simulate re-render without query change
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
