import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceRangeComponent } from './price-range.component';

describe('PriceRangeComponent', () => {
  let component: PriceRangeComponent;
  let fixture: ComponentFixture<PriceRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceRangeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('must update minPrice and maxPrice set twice as number', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const minInput = inputs[0] as HTMLInputElement;
    const maxInput = inputs[1] as HTMLInputElement;

    minInput.value = '1500';
    minInput.dispatchEvent(new Event('input'));

    maxInput.value = '5000';
    maxInput.dispatchEvent(new Event('input'));

    expect(component.minPrice()).toBe(1500);
    expect(component.maxPrice()).toBe(5000);
  });
});
