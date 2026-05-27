import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartItem } from '../interface/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  submitOrder(customerData: any, items: CartItem[]): Observable<{ success: boolean, orderId: string }> {
    return timer(1500).pipe(
      switchMap(() => {
          const mockOrderId = 'TKT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
          return of({ success: true, orderId: mockOrderId });
      })
    );
  }
}
