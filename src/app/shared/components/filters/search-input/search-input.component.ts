import { Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  title = input<string>();
  placeholder = input<string>('Buscar');
  initialValue = input<string>('');
  search = output<string>();

  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const value = this.initialValue();
      if (this.inputElement && this.inputElement.nativeElement.value !== value) {
        this.inputElement.nativeElement.value = value;
      }
    });
  }

  onSearchClick() {
    const value = this.inputElement.nativeElement.value;
    this.search.emit(value);
  }

  reset() {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
      this.search.emit('');
    }
  }
}
