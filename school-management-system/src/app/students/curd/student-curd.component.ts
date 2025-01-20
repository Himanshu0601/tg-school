import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environment/environment';
import { SenderService } from '../../shared/sender.service';
import { ReusableGridModule } from '../../common/reusable-grid/reusable-grid.module';

@Component({
  selector: 'app-student-curd',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ReusableGridModule,
  ],
  templateUrl: './student-curd.component.html',
  styleUrl: './student-curd.component.scss',
})
export class StudentCurdComponent implements OnInit {
  @Output() toolbarOperation = new EventEmitter()


  ngOnInit(): void {
    this.getLastAdmissionNumber();
    this.getAllClasses();
    this.getAllfeestr();
  }

  close() {
    this.toolbarOperation.emit('close');
  }

  studentForm: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;
  photoError: string | null = null;
  classes: any[] = [];
  sections: any[] = [];
  nationalities = ['Indian', 'American', 'Canadian', 'Australian', 'Other'];
  religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Other'];
  categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  feeStructure: any[] = [];
  selectedFeeStr: any[] = []

  constructor(
    private fb: FormBuilder,
    private service_sender: SenderService,
  ) {
    this.studentForm = this.fb.group({
      admissionNumber: [{ value: '', disabled: true }, [Validators.required]],
      rollNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      section: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      permanentAddress: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      altContactNumber: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      class: ['', [Validators.required]],
      nationality: ['Indian', Validators.required],
      religion: ['', Validators.required],
      category: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      fatherName: ['', Validators.required],
      fatherOccupation: [''],
      motherName: ['', Validators.required],
      motherOccupation: [''],
      dueAmount: ['', [Validators.required, Validators.min(0)]],
      dateOfAdmission: ['', Validators.required],
      studentPhoto: [null, Validators.required],
      aadharNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    });
  }

  getLastAdmissionNumber() {

    let formUrl = environment.baseUrl + '/student/getLastAdmissionNumber';


    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.studentForm.patchValue({
          admissionNumber: response.lastGeneratedAdmissionNumber,
        });
      },
      error: (error) => {

      }
    })
  }
  getAllClasses() {

    let formUrl = environment.baseUrl + '/class/getAll';


    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.classes = response;
      },
      error: (error) => {

      }
    })
  }
  getAllfeestr() {

    let formUrl = environment.baseUrl + '/fee/feestructure/getAll';


    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.feeStructure = [
          {
            "_id": "675c7e138fb8c692dc87a7a7",
            "name": "Play General Fees",
            "class": {
              "_id": "675c7ca08fb8c692dc87a77c",
              "name": "Play",
              "sections": [
                "A",
                "B"
              ],
              "createdAt": "2024-12-13T18:27:44.079Z",
              "updatedAt": "2024-12-13T18:27:44.079Z",
              "__v": 0
            },
            "feeGroups": [
              {
                "feeType": "April Month Fees",
                "amount": 500,
                "dueDate": "2024-04-30T00:00:00.000Z",
                "_id": "675c7e138fb8c692dc87a7a8"
              },
              {
                "feeType": "May Month Fees",
                "amount": 500,
                "dueDate": "2024-05-30T00:00:00.000Z",
                "_id": "675c7e138fb8c692dc87a7a9"
              },
              {
                "feeType": "June Month Fees",
                "amount": 500,
                "dueDate": "2024-06-30T00:00:00.000Z",
                "_id": "675c7e138fb8c692dc87a7aa"
              }
            ],
            "__v": 0
          },
          {
            "_id": "675d36b208e9a4f749dc26ac",
            "name": "hui",
            "class": {
              "_id": "675c7ca08fb8c692dc87a77c",
              "name": "Play",
              "sections": [
                "A",
                "B"
              ],
              "createdAt": "2024-12-13T18:27:44.079Z",
              "updatedAt": "2024-12-13T18:27:44.079Z",
              "__v": 0
            },
            "feeGroups": [
              {
                "feeType": "April Month Fees",
                "amount": 2000,
                "dueDate": "2024-12-03T00:00:00.000Z",
                "_id": "675d36b208e9a4f749dc26ad"
              }
            ],
            "__v": 0
          },
          {
            "_id": "675d47e708e9a4f749dc29d9",
            "name": "Full Stack Web Developer.",
            "class": {
              "_id": "675c7ca08fb8c692dc87a77c",
              "name": "Play",
              "sections": [
                "A",
                "B"
              ],
              "createdAt": "2024-12-13T18:27:44.079Z",
              "updatedAt": "2024-12-13T18:27:44.079Z",
              "__v": 0
            },
            "feeGroups": [
              {
                "feeType": "April Month Fees",
                "amount": 538,
                "dueDate": "2024-12-11T00:00:00.000Z",
                "_id": "675d47e708e9a4f749dc29da"
              }
            ],
            "__v": 0
          },
          {
            "_id": "6761207f0c9f8cddf809017b",
            "name": "fyuvjhv",
            "class": {
              "_id": "675d388808e9a4f749dc26d5",
              "name": "1st",
              "sections": [
                "A",
                "B"
              ],
              "createdAt": "2024-12-14T07:49:28.087Z",
              "updatedAt": "2024-12-14T07:49:28.087Z",
              "__v": 0
            },
            "feeGroups": [
              {
                "feeType": "April Month Fees",
                "amount": 676576,
                "dueDate": "6667-05-31T00:00:00.000Z",
                "_id": "6761207f0c9f8cddf809017c"
              }
            ],
            "__v": 0
          },
          {
            "_id": "6761207f0c9f8cddf809017f",
            "name": "fyuvjhv",
            "class": {
              "_id": "675d388808e9a4f749dc26d5",
              "name": "1st",
              "sections": [
                "A",
                "B"
              ],
              "createdAt": "2024-12-14T07:49:28.087Z",
              "updatedAt": "2024-12-14T07:49:28.087Z",
              "__v": 0
            },
            "feeGroups": [
              {
                "feeType": "April Month Fees",
                "amount": 676576,
                "dueDate": "6667-05-31T00:00:00.000Z",
                "_id": "6761207f0c9f8cddf8090180"
              }
            ],
            "__v": 0
          }
        ]
      },
      error: (error) => {

      }
    })
  }

  onFeeSelection(e: any, val: string) {
    if (e.target.checked) {
      this.selectedFeeStr.push(val)
    } else {
      this.selectedFeeStr = this.selectedFeeStr.filter(item => item != val)
    }
  }


  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.photoError = 'Please select a valid image file.';
        this.photoPreview = null;
        this.studentForm.get('studentPhoto')?.setValue(null);
        return;
      }

      this.photoError = null;

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result; // Display the preview
        this.studentForm.get('studentPhoto')?.setValue(file); // Update form control value
      };
      reader.readAsDataURL(file);
    }
  }



  submitForm() {
    console.log(this.selectedFeeStr)
    if (this.studentForm.valid) {
      console.log('Form submitted:', this.studentForm.value);
    }
  }
}
