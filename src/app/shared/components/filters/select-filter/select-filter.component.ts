import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [
  ],
  templateUrl: './select-filter.component.html',
})
export class SelectFilterComponent {
  label = input.required<string>();
  options = input.required<any[]>();
  selectionChanged = output<string>();

  onChange(event: Event) {
    this.selectionChanged.emit((event.target as HTMLSelectElement).value);
  }
 }
