import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../interface/cart.interface';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>(this.loadFromStorage());

  constructor() {
    effect(() => {
      localStorage.setItem('totem_cart', JSON.stringify(this.cartItems()));
    });
  }

  private loadFromStorage(): CartItem[] {
    const storedCart = localStorage.getItem('totem_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  totalItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  decreaseQuantity(productId: number): void {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === productId);

      if (!existingItem) {
        return items;
      }

      if (existingItem.quantity > 1) {
        return items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return items.filter((item) => item.product.id !== productId);
    });
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
