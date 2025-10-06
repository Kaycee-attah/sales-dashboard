import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { 
    path: 'sales', 
    loadComponent: () => import('./components/sales/sales.component').then(m => m.SalesComponent) 
  },
  { path: '**', redirectTo: '' }
];