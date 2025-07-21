import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/productsSlice";

export default function useProducts() {
  const dispatch = useAppDispatch();
  const { products, total, loading, error, query } = useAppSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(fetchProducts(query));
  }, [dispatch, query]);

  return { products, total, loading, error };
}
