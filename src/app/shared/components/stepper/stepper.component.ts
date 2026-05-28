import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  templateUrl: './stepper.component.html'
})
export class StepperComponent {
  quantity = input.required<number>();

  increment = output<void>();
  decrement = output<void>();
}
