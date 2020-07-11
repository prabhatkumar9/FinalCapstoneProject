import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  Username$: Observable<string>;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.Username$ = this.loginService.currentUsername;
  }
}
