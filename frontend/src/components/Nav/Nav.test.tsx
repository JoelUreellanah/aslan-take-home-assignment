import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavigationBar } from "./Nav";

describe("Nav component", () => {
  it("renders the home link correctly", () => {
    render(<NavigationBar />);
    const homeLink = screen.getByRole("link", { name: /ASLAN - PRODUCTS/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the ThemeToggle component", () => {
    render(<NavigationBar />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
