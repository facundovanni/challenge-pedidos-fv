import { Injectable } from '@angular/core';
import { QueryParams, FilterOption } from '../interface/query-params.interface';

@Injectable({ providedIn: 'root' })
export class QueryStringService {

  toUrlParams(query: QueryParams): Record<string, string | null> {
    const params: Record<string, string | null> = { search: query.search || null, searchBy: query.search ? (JSON.stringify(query.searchBy)) : null };

    query.filters.forEach(f => {
      params[`${f.key}_${f.op}`] = f.value;
    });

    return params;
  }

  toQueryParams(params: Record<string, any>): QueryParams {
    const filters: FilterOption[] = [];

    Object.keys(params).forEach(key => {
      if (key === 'search') return;
      if (key === 'searchBy') return;

      const [filterKey, op] = key.split('_');
      if (filterKey && op && params[key]) {
        filters.push({ key: filterKey, value: params[key], op: op as any });
      }
    });

    return {
      search: params['search'] || '',
      searchBy: params['searchBy'] ? JSON.parse(params['searchBy']) : [],
      filters
    };
  }
}
