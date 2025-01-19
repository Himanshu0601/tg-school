import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReusableGridModule } from '../../common/reusable-grid/reusable-grid.module';
import { environment } from '../../../environment/environment';
import { SenderService } from '../../shared/sender.service';

@Component({
  selector: 'app-student-grid',
  imports: [
    CommonModule,
    ReusableGridModule,
  ],
  templateUrl: './student-grid.component.html',
  styleUrl: './student-grid.component.scss'
})
export class StudentGridComponent implements OnInit {
  constructor(
    private service_sender: SenderService,
  ) {

  }
  ngOnInit(): void {
    this.getStudents()
  }


  datasource_student = []
  getStudents() {

    let formUrl = environment.baseUrl + '/student/getStudents';


    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.datasource_student = response
      },
      error: (error) => {

      }
    })
  }
}
