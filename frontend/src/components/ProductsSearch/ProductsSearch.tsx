"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchProducts, setQuery } from "@/redux/productsSlice";
import TextSearch from "@/components/ui/TextSearch/TextSearch";
import { SORT_BY } from "@/constants/sortOptions";
import { Plus, Heart } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { setWishlistFilterActive } from "@/redux/globalSlice";

export default function ProductsSearch() {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.products);
  const { isWishlistFilterActive } = useSelector(
    (state: RootState) => state.global
  );

  const defaultFilters = {
    search: "",
    sortBy: SORT_BY.NEWEST,
    isWishlist: isWishlistFilterActive ? isWishlistFilterActive : undefined,
  };
  const [search, setSearch] = useState(query.search || defaultFilters.search);

  const handleApplyFilters = () => {
    const newFilters = {
      search: search?.trim() || "",
      isWishlist: isWishlistFilterActive ? isWishlistFilterActive : undefined,
      sortBy: query.sortBy,
    };

    dispatch(setQuery(newFilters));
    dispatch(fetchProducts(newFilters));
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trimStart());
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleApplyFilters();
  };

  const toggleWishlistFilter = (active: boolean) => {
    dispatch(setWishlistFilterActive(active));
    handleApplyFilters();
  };

  useEffect(() => {
    setSearch((prev) => (prev !== query.search ? query.search || "" : prev));
  }, [query]);

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={onSubmit}>
      <div className="flex justify-center items-center gap-4">
        <TextSearch
          placeholder="Search products..."
          value={search}
          onChange={onSearchChange}
          className="w-full max-w-md"
        />

        <Button
          variant={`${isWishlistFilterActive ? "secondary" : "outline"}`}
          onClick={() => toggleWishlistFilter(!isWishlistFilterActive)}
        >
          <Heart
            className="h-6 w-6"
            fill={`${isWishlistFilterActive ? "currentColor" : "none"}`}
          />
          {isWishlistFilterActive ? "View All Products" : "View Wishlist"}
        </Button>

        <Link href={`/products/new`} className="block">
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    </form>
  );
}
