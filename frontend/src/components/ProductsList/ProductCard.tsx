import Image from "next/image";
import { Product } from "@/types";
import ProductOfferBadge from "./ProductOfferBadge";
import { Button } from "../ui/button";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { wishlistProduct } from "@/redux/wishlistProduct";

export default function ProductCard({ product }: { product: Product }) {
  const [wishListed, setWishListed] = useState(product.wishListed ?? false);
  const dispatch = useAppDispatch();

  async function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    const previous = wishListed;
    setWishListed(!previous); // optimistic UI update
    try {
      await dispatch(wishlistProduct(product.id)).unwrap();
    } catch (err) {
      // rollback UI on failure
      setWishListed(previous);
      // optionally show an error message or toast
      console.error("Failed to toggle wishlist:", err);
    }
  }

  return (
    <a
      href={product.googleShoppingLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article
        key={product.id}
        className="relative overflow-hidden
                   transition-transform hover:scale-[1.02] hover:shadow-xxl duration-300
                   flex flex-col group cursor-pointer h-96"
      >
        <Image
          width={300}
          height={200}
          src={product.imageUrl}
          alt={product.name}
          priority
          className="w-full h-48 object-cover rounded-lg"
        />

        <div className="pt-4 flex flex-col flex-grow overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg line-clamp-2">
              {product.name}
            </h4>
            <Button variant="ghost" onClick={handleWishlistToggle}>
              {wishListed ? <Heart fill="currentColor" /> : <Heart />}
            </Button>
          </div>

          {product.offer && <ProductOfferBadge offer={product.offer} />}

          <p className="text-xs text-muted mt-1">
            Uploaded on:{" "}
            {new Date(product.createdAt).toLocaleDateString("en-NL")}
          </p>
        </div>
      </article>
    </a>
  );
}
