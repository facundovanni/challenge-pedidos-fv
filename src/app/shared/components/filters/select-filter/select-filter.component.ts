import { Component, input, model } from '@angular/core';

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

  value = model<string>('');

  onChange(event: Event) {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
