import { Product } from "@/types";
import ProductCard from "@/components/ProductsList/ProductCard";
import useProducts from "@/hooks/useProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProductsList() {
  const { loading, products, error } = useProducts();
  const { isWishlistFilterActive } = useSelector(
    (state: RootState) => state.global
  );

  if (loading) return <div className="p-8">Loading products...</div>;
  if (error) return <div className="p-8">Error: {error}</div>;
  if ((!products || products.length === 0) && isWishlistFilterActive) {
    return (
      <div className="p-4 text-center">No products found in wish list.</div>
    );
  }
  if (!products || products.length === 0) {
    return <div className="p-4 text-center">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-4">
      {products.map((product: Product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
