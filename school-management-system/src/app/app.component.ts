import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { NavigatorTopComponent } from './navigator/navigator-top/navigator-top.component';
import { NavigatorLeftComponent } from './navigator/navigator-left/navigator-left.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    LoginComponent,
    NavigatorTopComponent,
    NavigatorLeftComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'school-management-system';

  loggedIn : boolean = true;
  isCollapsed :boolean = false;
  toggleOperation(e:boolean){
    this.isCollapsed = e
  }
}