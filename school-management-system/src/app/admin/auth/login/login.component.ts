import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SenderService } from '../../../shared/sender.service';
import { DataService } from '../../../shared/data.service';
import { environment } from '../../../../environment/environment';
import { UrlService } from '../../../shared/url.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
 @Output() loginSuccess = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private service_sender: SenderService,
    private service_data: DataService,
    private service_url: UrlService,
    private service_auth: AuthService,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Getter for easier access to form controls in the template
  get form_control() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }
    let formUrl = environment.baseUrl + '/user/login';
    let formData = {
      password: this.loginForm.controls['password'].value,
      username: this.loginForm.controls['email'].value
    };


    this.service_sender.makePostSeverCall(formUrl, formData).subscribe({
      next: (response: any) => {
        this.service_data.userDto = response.result;
        this.service_auth.setToken('authToken',response.token); 
        this.service_auth.setToken('UserId',response.result._id); 
        this.loginSuccess.emit(true)
        this.service_url.navigateTo('students/details')
      },
      error: (error) => {

      }
    })

  }
}
