
import { Routes } from '@angular/router';

export const checkoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout'
  },
];

export default checkoutRoutes;
