import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types/product';
import { fetchSingleProduct } from '../service/api/products';

export const useProduct = (id: string | undefined) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id!),
    enabled: !!id,
  });
};
