import {CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../../../core/interface/product.interface';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    CurrencyPipe, StepperComponent
  ],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  public product = input.required<Product>();
  public quantity = input<number>(0);

  public add = output<Product>();
  public remove = output<Product>();

  onAdd() {
    this.add.emit(this.product());
  }

  onRemove() {
    this.remove.emit(this.product());
  }
}
