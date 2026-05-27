import { Component, ElementRef, QueryList, ViewChildren, input, output } from '@angular/core';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [

  ],
  templateUrl: './price-range.component.html',
})
export class PriceRangeComponent {

  label = input.required<string>();
  rangeChanged = output<{min: number | null, max: number | null}>();

  @ViewChildren('priceInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  private currentMin: number | null = null;
  private currentMax: number | null = null;

  updateMin(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.rangeChanged.emit({ min: val ? Number(val) : null, max: null });
  }

  updateMax(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.rangeChanged.emit({ min: null, max: val ? Number(val) : null });
  }

  reset() {
    this.inputs.forEach(input => {
      input.nativeElement.value = '';
    });
    this.rangeChanged.emit({ min: null, max: null });
  }
}
