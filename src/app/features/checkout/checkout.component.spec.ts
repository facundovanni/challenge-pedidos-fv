import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceSpy: any;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['clearCart', 'removeFromCart']);

    cartServiceSpy.cartItems = signal([]);

    cartServiceSpy.totalPrice = () => 0;
    cartServiceSpy.totalItems = () => 0;

    orderServiceSpy = jasmine.createSpyObj('OrderService', ['submitOrder']);

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validations', () => {
    it('debería inicializar el formulario como inválido', () => {
      expect(component.checkoutForm.invalid).toBeTrue();
    });

    it('must validate email and user', () => {
      const emailControl = component.checkoutForm.controls.email;
      const nameControl = component.checkoutForm.controls.fullName;

      nameControl.setValue('');
      expect(nameControl.invalid).toBeTrue();
      expect(nameControl.hasError('required')).toBeTrue();

      nameControl.setValue('Al');
      expect(nameControl.invalid).toBeTrue();
      expect(nameControl.hasError('minlength')).toBeTrue();

      nameControl.setValue('John Doe');
      expect(nameControl.valid).toBeTrue();

      emailControl.setValue('');
      expect(emailControl.invalid).toBeTrue();

      emailControl.setValue('no-es-un-correo');
      expect(emailControl.invalid).toBeTrue();
      expect(emailControl.hasError('email')).toBeTrue();

      emailControl.setValue('test@ejemplo.com');
      expect(emailControl.valid).toBeTrue();
    });
  });

  describe('onSubmit', () => {
    it('must not send order if is invalid', () => {
      cartServiceSpy.cartItems.set([{ id: 1, name: 'Producto', price: 100 }]);

      component.onSubmit();

      expect(component.checkoutForm.touched).toBeTrue();
      expect(orderServiceSpy.submitOrder).not.toHaveBeenCalled();
    });

    it('must not send if cart is empty', () => {
      component.checkoutForm.controls.fullName.setValue('John Doe');
      component.checkoutForm.controls.email.setValue('john@ejemplo.com');

      cartServiceSpy.cartItems.set([]);

      component.onSubmit();

      expect(orderServiceSpy.submitOrder).not.toHaveBeenCalled();
    });

    it('must send and process ok', () => {
      const mockResponse = { success: true, orderId: 'ORD-12345' };
      orderServiceSpy.submitOrder.and.returnValue(of(mockResponse));

      component.checkoutForm.controls.fullName.setValue('John Doe');
      component.checkoutForm.controls.email.setValue('john@ejemplo.com');
      cartServiceSpy.cartItems.set([{ id: 1, quantity: 1 }]);

      component.onSubmit();

      expect(orderServiceSpy.submitOrder).toHaveBeenCalledWith(
        { fullName: 'John Doe', email: 'john@ejemplo.com' },
        cartServiceSpy.cartItems()
      );
      expect(component.isLoading()).toBeFalse();
      expect(component.orderSuccessId()).toBe('ORD-12345');
      expect(cartServiceSpy.clearCart).toHaveBeenCalled();
    });

    it('must return error', () => {
      const errorResponse = new Error('Falló el pago en la API simulada');
      orderServiceSpy.submitOrder.and.returnValue(throwError(() => errorResponse));

      component.checkoutForm.controls.fullName.setValue('John Doe');
      component.checkoutForm.controls.email.setValue('john@ejemplo.com');
      cartServiceSpy.cartItems.set([{ id: 1, quantity: 1 }]);

      component.onSubmit();

      expect(component.isLoading()).toBeFalse();
      expect(component.errorMessage()).toBe('Falló el pago en la API simulada');
      expect(component.orderSuccessId()).toBeNull();
      expect(cartServiceSpy.clearCart).not.toHaveBeenCalled();
    });
  });
});
