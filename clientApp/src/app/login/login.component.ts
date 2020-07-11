import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from 'src/model/login';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // email pattern
  emailPattern = '^[a-z0-9,_%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  // error message
  ermsg: string = '';

  // login model class object
  userlogin = new Login();

  // varaibles to store
  username: string;
  password: string;
  returnUrl: string;
  invalidLogin: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // it will assign url or this component
    // when this component will load
    // if user not loged in before then it will return to home page '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // login function
  login(form: NgForm) {
    // another logic
    this.loginService.LoginUser(this.userlogin).subscribe(
      (result) => {
        // username and password is valid
        // this token will be received form api
        console.log('logged in successfully');
        // make invalidLogin as false
        this.invalidLogin = false;

        // now navigate user to home or desired component
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        this.ermsg = 'Invalid Username and Password';
      }
    );
  }
}
