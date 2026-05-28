import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { QueryParams } from '../interface/query-params.interface';
import { MOCK_PRODUCTS } from '../mocks/products.mock';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts()', () => {
    it('must return all products', async () => {
      const params: QueryParams = { search: '', searchBy: [], filters: [] };

      const products = await service.getProducts(params);

      expect(products.length).toBe(MOCK_PRODUCTS.length);
      expect(products).toEqual(MOCK_PRODUCTS);
    });

    it('must filter products by search', async () => {
      const params: QueryParams = {
        search: 'a',
        searchBy: ['name'],
        filters: []
      };

      const products = await service.getProducts(params);

      const allMatch = products.every(p => p.name.toLowerCase().includes('a'));
      expect(allMatch).toBeTrue();
      if(MOCK_PRODUCTS.some(p => !p.name.toLowerCase().includes('a'))) {
         expect(products.length).toBeLessThan(MOCK_PRODUCTS.length);
      }
    });

    it('must filter by categoryId', async () => {
      const targetCategoryId = 1;
      const params: QueryParams = {
        search: '',
        searchBy: [],
        filters: [{ key: 'categoryId', value: targetCategoryId.toString(), op: 'eq' }]
      };

      const products = await service.getProducts(params);

      const allMatch = products.every(p => p.categoryId === targetCategoryId);
      expect(allMatch).toBeTrue();
    });

    it('must filter by price range', async () => {
      const minPrice = 1000;
      const maxPrice = 5000;
      const params: QueryParams = {
        search: '',
        searchBy: [],
        filters: [
          { key: 'price', value: minPrice.toString(), op: 'ge' },
          { key: 'price', value: maxPrice.toString(), op: 'le' }
        ]
      };

      const products = await service.getProducts(params);

      const allMatch = products.every(p => p.price >= minPrice && p.price <= maxPrice);
      expect(allMatch).toBeTrue();
    });
  });

  describe('getProductById()', () => {
    it('must return the product', async () => {
      const existingProduct = MOCK_PRODUCTS[0];

      const product = await service.getProductById(existingProduct.id);

      expect(product).toBeDefined();
      expect(product?.id).toBe(existingProduct.id);
      expect(product?.name).toBe(existingProduct.name);
    });

    it('must retundefined if not exist', async () => {
      const nonExistentId = 999999;

      const product = await service.getProductById(nonExistentId);

      expect(product).toBeUndefined();
    });
  });
});
