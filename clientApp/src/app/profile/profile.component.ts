import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // user details
  user;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    console.log(this.user);
  }

  fetchUserDetails() {
    this.user = this.loginService.userDetails;
  }
}
