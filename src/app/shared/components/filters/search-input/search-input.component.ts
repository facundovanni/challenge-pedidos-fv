import { Component, ElementRef, ViewChild, effect, input, model, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  title = input<string>('');
  placeholder = input<string>('Buscar...');

  value = model<string>('');

  onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
