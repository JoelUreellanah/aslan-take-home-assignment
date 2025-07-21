"use client";

import useProducts from "@/hooks/useProducts";
import ProductsList from "@/components/ProductsList/ProductsList";
import SelectInput from "../ui/SelectInput/SelectInput";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { SORT_BY } from "@/constants/sortOptions";
import { fetchProducts, setQuery } from "@/redux/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProductsSection() {
  const dispatch = useAppDispatch();
  const { total } = useProducts();
  const { query } = useAppSelector((state) => state.products);
  const [sortBy, setSortBy] = useState(query.sortBy || SORT_BY.NEWEST);
  const { isWishlistFilterActive } = useSelector(
    (state: RootState) => state.global
  );

  useEffect(() => {
    setSortBy((prev) =>
      prev !== query.sortBy ? query.sortBy || SORT_BY.NEWEST : prev
    );
  }, [query]);

  const onSortByChange = (value: string) => {
    setSortBy(value);

    const newFilters = {
      search: query.search?.trim() || "",
      isWishlist: isWishlistFilterActive ? isWishlistFilterActive : undefined,
      sortBy: value,
    };

    dispatch(setQuery(newFilters));
    dispatch(fetchProducts(newFilters));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-end w-full p-4">
          <p className="text-sm text-muted mr-1">
            Total products: {total} - Sort By:{" "}
          </p>
          <SelectInput
            value={sortBy}
            onChange={onSortByChange}
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
            ]}
          />
        </div>
      </div>
      <ProductsList />
    </>
  );
}
