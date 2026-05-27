import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductToolbarComponent } from './product-toolbar.component';

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
