interface DiscountedProduct {
  price: number;
  discountedPrice?: number;
}

export const calculateDiscountDetails = ({
  price,
  discountedPrice,
}: DiscountedProduct) => {
  const hasDiscount = discountedPrice !== undefined && discountedPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountedPrice!) / price) * 100)
    : 0;
  const finalPrice = hasDiscount ? discountedPrice! : price;

  return { hasDiscount, discountPercent, finalPrice };
};
