import { TestBed } from '@angular/core/testing';
import { QueryStringService } from './query-string.service';
import { QueryParams } from '../interface/query-params.interface';

describe('QueryStringService', () => {
  let service: QueryStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toUrlParams', () => {
    it('should map a complete QueryParams object to URL parameters', () => {
      const mockQuery: QueryParams = {
        search: 'hamburguesa',
        searchBy: ['name'],
        filters: [
          { key: 'categoryId', value: '2', op: 'eq' },
          { key: 'price', value: '1500', op: 'le' }
        ]
      };

      const result = service.toUrlParams(mockQuery);

      expect(result).toEqual({
        search: 'hamburguesa',
        searchBy: '["name"]',
        categoryId_eq: '2',
        price_le: '1500'
      });
    });

    it('should handle empty search and filters properly, setting them to null', () => {
      const mockQuery: QueryParams = {
        search: '',
        searchBy: ['name'],
        filters: []
      };

      const result = service.toUrlParams(mockQuery);

      expect(result).toEqual({
        search: null,
        searchBy: null
      });
    });
  });

  describe('toQueryParams', () => {
    it('should parse URL parameters back into a QueryParams object', () => {
      const mockUrlParams = {
        search: 'pizza',
        searchBy: '["name"]',
        categoryId_eq: '3',
        price_ge: '500'
      };

      const result = service.toQueryParams(mockUrlParams);

      expect(result).toEqual({
        search: 'pizza',
        searchBy: ['name'],
        filters: [
          { key: 'categoryId', value: '3', op: 'eq' },
          { key: 'price', value: '500', op: 'ge' }
        ]
      });
    });

    it('should return a default QueryParams object when given empty URL parameters', () => {
      const mockUrlParams = {};

      const result = service.toQueryParams(mockUrlParams);

      expect(result).toEqual({
        search: '',
        searchBy: [],
        filters: []
      });
    });

    it('should ignore malformed filters or missing values', () => {
      const mockUrlParams = {
        search: 'agua',
        categoryId_eq: '',
        invalidFilter: '123'
      };

      const result = service.toQueryParams(mockUrlParams);

      expect(result).toEqual({
        search: 'agua',
        searchBy: [],
        filters: []
      });
    });
  });
});
