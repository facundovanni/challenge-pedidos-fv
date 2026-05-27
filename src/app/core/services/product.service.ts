import { Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '../mocks/products.mock';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(params: Record<string, any>): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...MOCK_PRODUCTS];

        if (params['search']) {
          const term = params['search'].toLowerCase();
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(term)
          );
        }

        if (params['category'] && params['category'] !== '0') {
          const categoryId = +params['category'];
          filtered = filtered.filter(product => product.categoryId === categoryId);
        }

        if (params['price'] && params['price'] !== '0') {
          const [min, max] = params['price'].split('-').map(Number);
          filtered = filtered.filter(product =>
            product.price >= min && product.price <= max
          );
        }

        resolve(filtered);
      }, 1500);
    });
  }
}
