import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import cartRoutes from './cart.routes';
import productRoutes from '../products/products.routes';
import { Product } from '../../core/interface/product.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CartItemComponent],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  public cartService = inject(CartService);
}
