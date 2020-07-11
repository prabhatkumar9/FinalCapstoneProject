import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Register } from 'src/model/register';
import { RegistrationService } from 'src/services/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // model class object
  register = new Register();

  //
  isInvalidRegister: boolean;

  // email pattern
  emailPattern = '^[a-z0-9,_%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private registerService: RegistrationService,
    private router: Router
  ) {}

  // custom validator for confirm password

  ngOnInit(): void {
    this.resetForm();
  }

  // new user
  addNewUser() {
    this.registerService.RegisterNewUser(this.register).subscribe(
      (data) => console.log('data received'),
      (error) => console.log('error in registration')
    );
  }

  // registration
  registration() {
    this.registerService.register(this.register).subscribe(
      (result) => {
        this.isInvalidRegister = true;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.register = {
        username: '',
        password: '',
        email: '',
        contact: null,
      };
    }
  }
}
