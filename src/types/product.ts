import { z } from 'zod';

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductReview {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: ProductImage;
  rating: number;
  tags: string[];
  reviews: ProductReview[];
}

export interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

export interface ProductsApiResponse {
  data: Product[];
  meta: PaginationMeta;
}
export const contactSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),

  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Email must be a valid format (example@domain.com)'
    ),

  reason: z.string().min(1, 'Please select a contact reason'),

  orderNumber: z.string().optional(),

  message: z.string().min(10, 'Message must be at least 10 characters'),
});
