import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'students/details',  loadComponent: () => import('./students/students.component').then(m=>m.StudentsComponent) }
];
