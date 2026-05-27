import { Component, effect, ElementRef, input, model, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [

  ],
  templateUrl: './price-range.component.html',
})
export class PriceRangeComponent {

  label = input<string>('');

  minPrice = model<number | null>(null);
  maxPrice = model<number | null>(null);

  onMinInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.minPrice.set(val ? Number(val) : null);
  }

  onMaxInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.maxPrice.set(val ? Number(val) : null);
  }
}
