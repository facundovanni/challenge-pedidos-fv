import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private fb = inject(NonNullableFormBuilder);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  orderSuccessId = signal<string | null>(null);

  checkoutForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.checkoutForm.invalid || this.cartService.cartItems().length === 0) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.orderService.submitOrder(this.checkoutForm.getRawValue(), this.cartService.cartItems())
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.orderSuccessId.set(response.orderId);
          this.cartService.clearCart();
        },
        error: (err: Error) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message);
        }
      });
  }
}
