import { Component, effect, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [
  ],
  templateUrl: './select-filter.component.html',
})
export class SelectFilterComponent {
  label = input<string>('');
  options = input<any[]>([]);
  initialValue = input<string>('');
  selectionChanged = output<string>();

  @ViewChild('selectRef') selectElement!: ElementRef<HTMLSelectElement>;

  constructor() {
    effect(() => {
      const val = this.initialValue() || '';
      if (this.selectElement && this.selectElement.nativeElement.value !== val) {
        this.selectElement.nativeElement.value = val;
      }
    });
  }

  onChange(event: Event) {
    this.selectionChanged.emit((event.target as HTMLSelectElement).value);
  }

  reset() {
    if (this.selectElement) this.selectElement.nativeElement.value = '';
  }
}
