import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReusableGridModule } from '../../common/reusable-grid/reusable-grid.module';
import { SenderService } from '../../shared/sender.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-classes-grid',
  imports: [
    CommonModule,
    ReusableGridModule,
  ],
  templateUrl: './classes-grid.component.html',
  styleUrl: './classes-grid.component.scss'
})
export class ClassesGridComponent implements OnInit {
  constructor(
    private service_sender: SenderService,
  ) {

  }
  ngOnInit(): void {
    this.getClasses()
  }

  @Output() toolbarOperation = new EventEmitter()
  @Input('data_to_add') set dataToAdd({ dataItem }: any) {
    if (dataItem) {
      this.datasource_classes.push(dataItem)
    }
  }
  @Input('data_to_update') set data_to_update({ dataItem }: any) {
    if (dataItem) {
      this.datasource_classes = this.datasource_classes.map(item=>{
        if(item._id == dataItem._id){
          item = dataItem
        }
        return item;
      })
    }
  }

  datasource_classes: any[] = [];

  getClasses() {

    let formUrl = environment.baseUrl + '/class/getAll';


    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.datasource_classes = response
      },
      error: (error) => {

      }
    })
  }

  onEdit(item: any) {
    this.toolbarOperation.emit({ action_type: 'update', data: item })
  }

  onDelete(item: any) {

  }

}