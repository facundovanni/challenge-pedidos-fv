import { Component, effect, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [

  ],
  templateUrl: './price-range.component.html',
})
export class PriceRangeComponent {

  label = input<string>('');
  initialMin = input<number | null>(null);
  initialMax = input<number | null>(null);
  rangeChanged = output<{ min: number | null; max: number | null }>();

  @ViewChild('minRef') minElement!: ElementRef<HTMLInputElement>;
  @ViewChild('maxRef') maxElement!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const min = this.initialMin();
      const max = this.initialMax();

      if (this.minElement && this.minElement.nativeElement.value !== (min?.toString() || '')) {
        this.minElement.nativeElement.value = min !== null ? min.toString() : '';
      }
      if (this.maxElement && this.maxElement.nativeElement.value !== (max?.toString() || '')) {
        this.maxElement.nativeElement.value = max !== null ? max.toString() : '';
      }
    });
  }

  onInput() {
    const minVal = this.minElement.nativeElement.value;
    const maxVal = this.maxElement.nativeElement.value;

    this.rangeChanged.emit({
      min: minVal ? Number(minVal) : null,
      max: maxVal ? Number(maxVal) : null
    });
  }

  reset() {
    if (this.minElement) this.minElement.nativeElement.value = '';
    if (this.maxElement) this.maxElement.nativeElement.value = '';
  }
}
