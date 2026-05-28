import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../../core/interface/cart.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  item = input.required<CartItem>();

  remove = output<void>();
  increase = output<void>();
  decrease = output<void>();

  onRemove() {
    this.remove.emit();
  }

  onIncrease() {
    this.increase.emit();
  }

  onDecrease() {
    this.decrease.emit();
  }
}
