import { Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
  ],
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
      if (this.inputElement?.nativeElement) {
        this.inputElement.nativeElement.value = value;
      }
    });
  }

  handleEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }

  reset() {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
  }
}
