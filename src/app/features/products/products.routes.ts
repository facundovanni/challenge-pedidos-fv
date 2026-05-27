
import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list.component').then(m => m.ProductListComponent),
    title: 'Listado de Productos'
  },
];

export default productRoutes;
