import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'grid',  loadComponent: () => import('./dashboard/grid/grid.component').then(m=>m.GridComponent) }
];
