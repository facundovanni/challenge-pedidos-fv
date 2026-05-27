import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
