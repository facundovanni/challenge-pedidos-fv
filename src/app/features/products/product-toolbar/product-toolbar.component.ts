import { MOCK_CATEGORIES } from './../../../core/mocks/categories.mock';
import { Component, effect, input, output, signal } from '@angular/core';
import { QueryParams, FilterOption } from '../../../core/interface/query-params.interface';
import { PriceRangeComponent } from '../../../shared/components/filters/price-range/price-range.component';
import { SearchInputComponent } from '../../../shared/components/filters/search-input/search-input.component';
import { SelectFilterComponent } from '../../../shared/components/filters/select-filter/select-filter.component';

@Component({
  selector: 'app-product-toolbar',
  standalone: true,
  imports: [SearchInputComponent, SelectFilterComponent, PriceRangeComponent],
  templateUrl: './product-toolbar.component.html'
})
export class ProductToolbarComponent {

  categories = signal(MOCK_CATEGORIES);
  queryChanged = output<QueryParams>();
  initialParams = input<QueryParams | null>(null);

  searchTerm = signal('');
  selectedCategory = signal('');
  priceMin = signal<number | null>(null);
  priceMax = signal<number | null>(null);

  constructor() {
    effect(() => {
      const params = this.initialParams();

      if (params) {
        this.searchTerm.set(params.search || '');

        const categoryFilter = params.filters.find(f => f.key === 'categoryId');
        this.selectedCategory.set(categoryFilter?.value || '');

        const minFilter = params.filters.find(f => f.key === 'price' && f.op === 'ge');
        const maxFilter = params.filters.find(f => f.key === 'price' && f.op === 'le');

        this.priceMin.set(minFilter ? Number(minFilter.value) : null);
        this.priceMax.set(maxFilter ? Number(maxFilter.value) : null);
      }
    }, { allowSignalWrites: true });
  }

  onReset() {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.priceMin.set(null);
    this.priceMax.set(null);

    this.emitQuery();
  }

  emitQuery() {
    const activeFilters: FilterOption[] = [];

    if (this.selectedCategory()) {
      activeFilters.push({ key: 'categoryId', value: this.selectedCategory(), op: 'eq' });
    }
    if (this.priceMin() !== null) {
      activeFilters.push({ key: 'price', value: this.priceMin()!.toString(), op: 'ge' });
    }
    if (this.priceMax() !== null) {
      activeFilters.push({ key: 'price', value: this.priceMax()!.toString(), op: 'le' });
    }

    const queryPayload: QueryParams = {
      search: this.searchTerm(),
      searchBy: ['name'],
      filters: activeFilters
    };

    this.queryChanged.emit(queryPayload);
  }
}
