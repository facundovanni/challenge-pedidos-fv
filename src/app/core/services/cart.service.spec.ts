import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../interface/product.interface';
import { CartItem } from '../interface/cart.interface';

describe('CartService', () => {
  let service: CartService;

  const mockProduct1: Product = { id: 1, name: 'Hamburguesa', price: 1000, categoryId: 1, category: { id: 1, name: 'Comida' } };
  const mockProduct2: Product = { id: 2, name: 'Papas Fritas', price: 500, categoryId: 1, category: { id: 1, name: 'Comida' } };

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({
      providers: [CartService]
    });

    service = TestBed.inject(CartService);
  });

  it('must create with empty cart by defaule', () => {
    expect(service).toBeTruthy();
    expect(service.cartItems()).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith('totem_cart');
  });

  it('must initialize with items if data in localStorage', () => {
    const storedCart: CartItem[] = [{ product: mockProduct1, quantity: 2 }];
    (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify(storedCart));

    const newService = TestBed.runInInjectionContext(() => new CartService());

    expect(newService.cartItems().length).toBe(1);
    expect(newService.cartItems()[0].quantity).toBe(2);
  });

  describe('cart operations', () => {
    it('must add new product', () => {
      service.addToCart(mockProduct1);

      const items = service.cartItems();
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe(mockProduct1.id);
      expect(items[0].quantity).toBe(1);
    });

    it('must increase the quantity if product exists', () => {
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct1);

      const items = service.cartItems();
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
    });

    it('must calculate totalItems (Computed)', () => {
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct2);

      expect(service.totalItems()).toBe(3);
    });

    it('must calculate totalPrice (Computed)', () => {
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct2);
      service.addToCart(mockProduct2);

      expect(service.totalPrice()).toBe(2000);
    });

    it('must delete a product', () => {
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct2);

      service.removeFromCart(mockProduct1.id);

      const items = service.cartItems();
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe(mockProduct2.id);
    });

    it('must decrease the quantity of a product(decreaseQuantity)', () => {
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct1);

      service.decreaseQuantity(mockProduct1.id);

      expect(service.cartItems()[0].quantity).toBe(1);
    });

    it('must delet product if decrease and result zero', () => {
      service.addToCart(mockProduct1);

      service.decreaseQuantity(mockProduct1.id);

      expect(service.cartItems().length).toBe(0);
    });

    it('must empty the cart', () => {
      service.addToCart(mockProduct1);
      service.addToCart(mockProduct2);

      service.clearCart();

      expect(service.cartItems().length).toBe(0);
      expect(service.totalItems()).toBe(0);
      expect(service.totalPrice()).toBe(0);
    });
  });

  it('must call setItems if cart change', () => {
    service.addToCart(mockProduct1);

    TestBed.flushEffects();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'totem_cart',
      JSON.stringify(service.cartItems())
    );
  });
});
