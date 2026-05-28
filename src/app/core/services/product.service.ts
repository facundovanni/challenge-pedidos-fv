import { Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { Product } from '../interface/product.interface';
import { QueryParams } from '../interface/query-params.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(params: QueryParams): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...MOCK_PRODUCTS];

        if (params.search && params.searchBy.length > 0) {
          const term = params.search.toLowerCase();

          filtered = filtered.filter(product => {
            return params.searchBy.some(field => {
              const value = (product as any)[field];
              return value && value.toString().toLowerCase().includes(term);
            });
          });
        }

        if (params.filters.length) {
          const categoryFilter = params.filters.filter(f => f.key == 'categoryId');
          if (categoryFilter.length) {
            filtered = filtered.filter(product => product.categoryId === +categoryFilter[0].value);
          }

          const priceMinFilter = params.filters.find(f => f.key === 'price' && f.op === 'ge');
          const priceMaxFilter = params.filters.find(f => f.key === 'price' && f.op === 'le');

          if (priceMinFilter) {
            filtered = filtered.filter(p => p.price >= +priceMinFilter.value);
          }
          if (priceMaxFilter) {
            filtered = filtered.filter(p => p.price <= +priceMaxFilter.value);
          }
        }
        resolve(filtered);
      }, 1500);
    });
  }

  getProductById(id: number): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(product);
      }, 500);
    });
  }
}
