import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: "classes" ,pathMatch:'full'},
    { path: 'students/details', loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent) },
    { path: 'classes', loadComponent: () => import('./classes/classes.component').then(m => m.ClassesComponent) }
];
