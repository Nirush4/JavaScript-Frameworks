import axios from 'axios';
import type { ProductsApiResponse } from '../../types/product';

const BASE_URL = 'https://v2.api.noroff.dev/online-shop';

export async function fetchData(
  page = 1,
  limit = 12
): Promise<ProductsApiResponse> {
  try {
    const response = await axios.get<ProductsApiResponse>(BASE_URL, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
