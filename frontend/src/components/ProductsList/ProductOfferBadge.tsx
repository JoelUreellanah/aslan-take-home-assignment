import { Offer } from "@/types";

export default function ProductOfferBadge({ offer }: { offer: Offer }) {
  if (!offer || offer.discountAmount === undefined || offer.discountAmount <= 0)
    return null;

  const fallbackLabel = offer.isPercentage
    ? `${offer.discountAmount}% OFF`
    : `Save £${offer.discountAmount}`;

  const label = offer.description?.trim() ? offer.description : fallbackLabel;

  return <p className="text-sm font-medium text-green-600 mt-1">🎉 {label}</p>;
}
