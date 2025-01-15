import { Component, EventEmitter, Output } from '@angular/core';
import { KeyValuePipe } from '../../pipes/key-value.pipe';
import { CommonModule } from '@angular/common';
import { UrlService } from '../../shared/url.service';

@Component({
  selector: 'app-navigator-left',
  imports: [
    CommonModule,
    KeyValuePipe,
  ],
  templateUrl: './navigator-left.component.html',
  styleUrl: './navigator-left.component.scss'
})
export class NavigatorLeftComponent {
  isCollapsed = false;
    constructor(private service_url: UrlService) { }

  @Output() toggleOperation = new EventEmitter

  schoolModules = {
    Dashboard: {
      name: 'Dashboard',
      icon: 'bi-speedometer2',
      route: '/dashboard',
      display: true,
      children: [],
    },
    Students: {
      name: 'Students',
      icon: 'bi-people',
      route: '/students',
      display: true,
      children: [
        {
          name: 'Admissions', route: '/students/admissions', icon: 'bi-person-plus', display: true,
        },
        { name: 'Attendance', route: '/students/attendance' , icon: 'bi-check2-circle', display: true,},
        { name: 'Performance', route: '/students/performance', icon: 'bi-graph-up', display: true, },
      ],
    },
    Teachers: {
      name: 'Teachers',
      icon: 'bi-person',
      route: '/teachers',
      display: true,
      children: [
        { name: 'Schedule', route: '/teachers/schedule', icon: 'bi-check2-circle', display: true, },
        { name: 'Attendance', route: '/teachers/attendance', icon: 'bi-check2-circle', display: true, },
      ],
    },
    Classes: {
      name: 'Classes',
      icon: 'bi-check2-circle',
      route: '/classes',
      display: true,
      children: [
        { name: 'Timetable', route: '/classes/timetable', icon: 'bi-calendar', display: true, },
        { name: 'Subjects', route: '/classes/subjects', icon: 'bi-book', display: true, },
      ],
    },
    Examinations: {
      name: 'Examinations',
      icon: 'bi-mortarboard',
      route: '/examinations',
      display: true,
      children: [
        { name: 'Schedule', route: '/examinations/schedule', icon: 'bi-file-earmark-bar-graph', display: true, },
        { name: 'Results', route: '/examinations/results', icon: 'bi-file-earmark-bar-graph', display: true, },
      ],
    },
    Fees: {
      name: 'Fees',
      icon: 'bi-currency-dollar',
      route: '/fees',
      display: true,
      children: [
        { name: 'Collection', route: '/fees/collection', icon: 'bi-wallet', display: true, },
        { name: 'Due List', route: '/fees/due-list', icon: 'bi-list-check', display: true, },
      ],
    },
    Library: {
      name: 'Library',
      icon: 'bi-journal-bookmark',
      route: '/library',
      display: true,
      children: [
        { name: 'Books', route: '/library/books', icon: 'bi-journal', display: true, },
        { name: 'Borrowed', route: '/library/borrowed', icon: 'bi-journal-arrow-down', display: true, },
      ],
    },
    Transport: {
      name: 'Transport',
      icon: 'bi-bus-front',
      route: '/transport',
      display: true,
      children: [
        { name: 'Routes', route: '/transport/routes' , icon: 'bi-map', display: true,},
        { name: 'Vehicles', route: '/transport/vehicles', icon: 'bi-truck', display: true, },
      ],
    },
    Settings: {
      name: 'Settings',
      icon: 'bi-gear',
      route: '/settings',
      display: true,
      children: [],
    },
  };
  
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleOperation.emit(this.isCollapsed)
  }

  changeInternalView(){
    this.service_url.navigateTo('grid')
  }
}
