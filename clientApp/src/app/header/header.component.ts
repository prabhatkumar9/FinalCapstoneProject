import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/login.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //  $ sign used as naming convention for
  // observalbe type variables
  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  constructor(
    private loginService: LoginService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.LoginStatus$ = this.loginService.isLoggedIn;
    this.Username$ = this.loginService.currentUsername;
  }

  // calling service
  onLogOut() {
    // cache clear when logout
    this.productService.clearCache();
    this.loginService.logout();
    window.location.reload();
  }
}
