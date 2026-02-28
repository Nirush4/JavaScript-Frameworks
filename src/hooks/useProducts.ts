import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../service/api/products';
import type { ProductsApiResponse } from '../types/product';

export const useProducts = (page: number, limit = 12) => {
  return useQuery<ProductsApiResponse, Error>({
    queryKey: ['products', page],
    queryFn: () => fetchData(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
