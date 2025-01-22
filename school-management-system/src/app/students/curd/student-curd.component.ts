import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environment/environment';
import { SenderService } from '../../shared/sender.service';
import { ReusableGridModule } from '../../common/reusable-grid/reusable-grid.module';
import { LoaderService } from '../../shared/loader.service';

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
    private service_loader: LoaderService,
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
    this.service_loader.loadingStart("student_curd","Please wait.")
    
    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.service_loader.loadingStop("student_curd")
        this.studentForm.patchValue({
          admissionNumber: response.lastGeneratedAdmissionNumber,
        });
      },
      error: (error) => {
        this.service_loader.loadingStop("student_curd")
      }
    })
  }
  getAllClasses() {

    let formUrl = environment.baseUrl + '/class/getAll';

    this.service_loader.loadingStart("student_curd","Please wait.")
    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.service_loader.loadingStop("student_curd")
        this.classes = response;
      },
      error: (error) => {
        this.service_loader.loadingStop("student_curd")
      }
    })
  }
  getAllfeestr() {

    let formUrl = environment.baseUrl + '/fee/feestructure/getAll';

    this.service_loader.loadingStart("student_curd","Please wait.")
    this.service_sender.makeGetSeverCall(formUrl, {}).subscribe({
      next: (response: any) => {
        this.service_loader.loadingStop("student_curd")
        this.feeStructure = response;
      },
      error: (error) => {
        this.service_loader.loadingStop("student_curd")
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
        this.photoPreview = reader.result; 
        this.studentForm.get('studentPhoto')?.setValue(file); 
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
