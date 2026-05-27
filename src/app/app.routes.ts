import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes'),
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes')
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
