import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductToolbarComponent } from './product-toolbar.component';
import { QueryParams } from '../../../core/interface/query-params.interface';

describe('ProductToolbarComponent', () => {
  let component: ProductToolbarComponent;
  let fixture: ComponentFixture<ProductToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductToolbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('must initialize with data', () => {
    const mockParams: QueryParams = {
      search: 'Hamburguesa',
      searchBy: ['name'],
      filters: [
        { key: 'categoryId', value: '1', op: 'eq' },
        { key: 'price', value: '1500', op: 'ge' },
        { key: 'price', value: '5000', op: 'le' }
      ]
    };

    fixture.componentRef.setInput('initialParams', mockParams);

    fixture.detectChanges();

    expect(component.searchTerm()).toBe('Hamburguesa');
    expect(component.selectedCategory()).toBe('1');
    expect(component.priceMin()).toBe(1500);
    expect(component.priceMax()).toBe(5000);
  });

  it('must not fail if initialData is null', () => {
    fixture.componentRef.setInput('initialParams', null);
    fixture.detectChanges();

    expect(component.searchTerm()).toBe('');
    expect(component.selectedCategory()).toBe('');
    expect(component.priceMin()).toBeNull();
    expect(component.priceMax()).toBeNull();
  });

  it('must build and emit params', () => {
    spyOn(component.queryChanged, 'emit');

    component.searchTerm.set('Pizza');
    component.selectedCategory.set('2');
    component.priceMin.set(100);
    component.priceMax.set(900);

    component.emitQuery();

    expect(component.queryChanged.emit).toHaveBeenCalledWith({
      search: 'Pizza',
      searchBy: ['name'],
      filters: [
        { key: 'categoryId', value: '2', op: 'eq' },
        { key: 'price', value: '100', op: 'ge' },
        { key: 'price', value: '900', op: 'le' }
      ]
    });
  });

  it('must avoid null filters or empty data', () => {
    spyOn(component.queryChanged, 'emit');

    component.searchTerm.set('Agua');
    component.selectedCategory.set('');
    component.priceMin.set(null);
    component.priceMax.set(null);

    component.emitQuery();

    expect(component.queryChanged.emit).toHaveBeenCalledWith({
      search: 'Agua',
      searchBy: ['name'],
      filters: []
    });
  });

  it('must reset all and emit a clean query', () => {
    spyOn(component.queryChanged, 'emit');

    component.searchTerm.set('Agua');
    component.selectedCategory.set('2');
    component.priceMin.set(100);

    component.onReset();

    expect(component.searchTerm()).toBe('');
    expect(component.selectedCategory()).toBe('');
    expect(component.priceMin()).toBeNull();
    expect(component.priceMax()).toBeNull();

    expect(component.queryChanged.emit).toHaveBeenCalledWith({
      search: '',
      searchBy: ['name'],
      filters: []
    });
  });
});
