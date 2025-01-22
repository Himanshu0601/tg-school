import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SenderService } from '../../shared/sender.service';
import { NotificationService } from '../../notification/notification.service';
import { LoaderService } from '../../shared/loader.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-fees-curd',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fees-curd.component.html',
  styleUrl: './fees-curd.component.scss'
})
export class FeesCurdComponent {
 @Output() toolbarOperation = new EventEmitter();


  heaeder_name!: string
  callsource!: string
  button!: string
  classForm: FormGroup;
  selectedDataItem: any = null;
  sections = ["A", "B", "C", "D", "E", "F", "G"]; // Static list of sections

  constructor(
    private fb: FormBuilder,
    private service_sender: SenderService,
    private notification_service: NotificationService,
    private loader_service: LoaderService,


  ) {

    this.classForm = this.fb.group({
      name: ['', Validators.required],

    });


  }

  @Input('child_data') set child_data({ callsource, dataItem }: any) {
    this.callsource = callsource;
    if (callsource == "create") {
      this.heaeder_name = "Add Fee Structure";
      this.button = "Create"
    } else {
      this.selectedDataItem = dataItem
      this.heaeder_name = "Edit Fee Structure"
      this.button = "Update"
      this.bind_form(dataItem)
    }
  }

  bind_form(dataItem: any) {

 
  }




  submitForm() {
    if (!this.classForm.valid) {
      return;
    }
    if (this.callsource == 'create') {
      this.addClass()
    } else {
      this.updateClass()
    }

  }


  addClass() {

    const selectedSections = this.classForm.value.sections
      .map((checked: boolean, i: number) => (checked ? this.sections[i] : null))
      .filter((v: string | null) => v !== null);
    let formUrl = environment.baseUrl + '/class/add';

    let formData = {
      "name": this.classForm.value.name,
      "sections": selectedSections
    }
    this.loader_service.loadingStart("classCurd","Please wait.")
    this.service_sender.makePostSeverCall(formUrl, formData).subscribe({
      next: (response: any) => {
        this.loader_service.loadingStop("classCurd")
        this.notification_service.notifier('success', "New class added successfully.");
        this.toolbarOperation.emit({ action_type: 'created', data: response })
      },
      error: (error) => {
        this.loader_service.loadingStop("classCurd")
      }
    })
  }


  updateClass() {
    const selectedSections = this.classForm.value.sections
      .map((checked: boolean, i: number) => (checked ? this.sections[i] : null))
      .filter((v: string | null) => v !== null);
    let formUrl = environment.baseUrl + '/class/update/' + this.selectedDataItem._id;

    let formData = {
      "name": this.classForm.value.name,
      "sections": selectedSections,

    }
    this.loader_service.loadingStart("classCurd", "Please wait ...");
    this.service_sender.makePutSeverCall(formUrl, formData).subscribe({
      next: (response: any) => {
        this.loader_service.loadingStop("classCurd");
        this.selectedDataItem = response;
        this.notification_service.notifier('success', "Class updated successfully.");
        this.toolbarOperation.emit({ action_type: 'updated', data: response })
      },
      error: (error) => {
        this.loader_service.loadingStop("classCurd");
      }
    })
  }
  close() {
    this.toolbarOperation.emit({ action_type: 'close', data: null });
  }
}
