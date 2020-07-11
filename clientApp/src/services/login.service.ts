import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // user related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private Username = new BehaviorSubject<string>(
    localStorage.getItem('username')
  );
  private UserRole = new BehaviorSubject<string>(
    localStorage.getItem('userRole')
  );

  constructor(private httpClient: HttpClient, private router: Router) {}

  checkLoginStatus() {
    let loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie == '1') {
      return true;
      // if (
      //   localStorage.getItem('jwt') === null ||
      //   localStorage.getItem('jwt') === undefined
      // ) {
      //   return false;
      // }
      // get token from local storage
      // const token = localStorage.getItem('jwt');
      // const decoded = jwt_decode(token);
      // // check id cookie is valid
      // if (decoded.exp === undefined) {
      //   return false;
      // }
      // get current date and time
      // const date = new Date(0);
      // convert exp time to utc
      // let tokenExpDate = date.setUTCSeconds(decoded.exp);
      // if value of token time greater than
      // if (tokenExpDate.valueOf() > new Date().valueOf()) {
      //   return true;
      // }
      // return false;
    }
    return false;
  }

  // login method
  public LoginUser(user: Login): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/auth/signin', user)
      .pipe(
        map((result) => {
          // console.log(result.accessToken);
          // if result is jwt token
          if (result && result.accessToken) {
            this.loginStatus.next(true);
            // set values in local storeage for
            // accessing in each component
            localStorage.setItem('loginStatus', '1');
            // use word token if u added token in backend api for returning
            // token
            localStorage.setItem('jwt', result.accessToken);
            // make sure api return property name
            // will same name here to access in result
            localStorage.setItem('username', result.username);
            // localStorage.setItem('expiration', result.expiration);
            localStorage.setItem('userRole', result.roles[0]);
            // console.log(result.roles[0]);
            localStorage.setItem('userid', result.id);
            localStorage.setItem('useremail', result.email);
            this.Username.next(localStorage.getItem('username'));
            this.UserRole.next(localStorage.getItem('userRole'));
          }
        })
      );
  }

  // logout method
  logout() {
    // make loginstatus false
    this.loginStatus.next(false);
    // remove properties from localstorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');

    // navigate back to the other page
    this.router.navigate(['/login']);
    console.log('logged out successfully');
  }

  // supply value to other components
  get isLoggedIn() {
    // observable method to return status
    return this.loginStatus.asObservable();
  }

  get currentUsername() {
    return this.Username.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
