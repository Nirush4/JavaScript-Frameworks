import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  Rating,
  Box,
} from '@mantine/core';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, image, price, discountedPrice, rating } = product;

  const hasDiscount = discountedPrice && discountedPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountedPrice!) / price) * 100)
    : 0;

  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      className='transition-transform duration-300 hover:scale-103 hover:shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
      role='group'
      aria-labelledby={`product-title-${id}`}
      tabIndex={0}
    >
      <Box style={{ position: 'relative' }}>
        <Card.Section>
          <Image src={image.url} mah={200} alt={image.alt} />
        </Card.Section>

        {hasDiscount ? (
          <Badge
            color='lime'
            variant='filled'
            radius='md'
            size='lg'
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
              zIndex: 10,
            }}
            aria-label={`${discountPercent}% off`}
          >
            {discountPercent}% OFF
          </Badge>
        ) : (
          <div></div>
        )}
      </Box>

      <Text fw={500} lineClamp={2} mt='md' mb='xs' id={`product-title-${id}`}>
        {title}
      </Text>

      <Group gap='xs' align='center'>
        <Text fw={700} fz='lg'>
          ${hasDiscount ? discountedPrice!.toFixed(2) : price.toFixed(2)}
        </Text>
        {hasDiscount && (
          <Text
            fz='sm'
            c='dimmed'
            style={{ textDecoration: 'line-through' }}
            aria-label={`Original price $${price.toFixed(2)}`}
          >
            ${price.toFixed(2)}
          </Text>
        )}
      </Group>

      <Rating
        value={rating}
        readOnly
        fractions={2}
        size='sm'
        mt='xs'
        aria-label={`Rated ${rating} out of 5`}
      />

      <Button
        fullWidth
        mt='md'
        radius='md'
        color='blue'
        aria-label={`Add ${title} to cart`}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
