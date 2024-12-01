import { API_URL } from '@/helpers/env';
import { fetchData } from '@/helpers/fetch';
import { PaginatedResponse, Product } from '@/types/custom-types';

class ProductService {
  private endpoint = `${API_URL}/products`;

  getProducts = async ({
    name,
    page,
    perPage = page ? 10 : undefined,
  }: {
    name?: string;
    page?: number;
    perPage?: number;
  }) => {
    const url = new URL(this.endpoint);
    if (name) url.searchParams.set('name_like', name);
    if (page) {
      url.searchParams.set('_page', page.toString());
      if (perPage) url.searchParams.set('_per_page', perPage.toString());
      return fetchData<PaginatedResponse<Product>>(url.toString());
    }
    return fetchData<Product[]>(url.toString());
  };

  getProduct = async (id: string) => {
    const url = `${this.endpoint}/${id}`;
    return fetchData<Product>(url);
  };
}

const productService = new ProductService();

export default productService;
