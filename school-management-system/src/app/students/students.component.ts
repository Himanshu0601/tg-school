import { Component } from '@angular/core';
import { StudentGridComponent } from './grid/student-grid.component';

@Component({
  selector: 'app-students',
  imports: [
    StudentGridComponent,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

}
