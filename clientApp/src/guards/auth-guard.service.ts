import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { LoginService } from 'src/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginService.isLoggedIn.pipe(
      take(1),
      map((loginStatus: boolean) => {
        const destination: string = state.url;
        const productid = route.params.id;

        // if user loged in
        if (destination === '/admin') {
          if (localStorage.getItem('userRole') === 'ROLE_ADMIN') {
            return true;
          } else {
            this.router.navigate(['access-denied']);
            return false;
          }
        } else if (
          destination == '/cart' ||
          destination == '/profile' ||
          destination == '/orderHistory'
        ) {
          if (
            localStorage.getItem('username') != null &&
            localStorage.getItem('username') != undefined
          ) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        } else {
          return false;
        }
      })
    );
  }
}

// console.log(
//   this.loginService.currentUserRole.subscribe((result) => {
//     console.log(result);
//     return result;
//   })
// );
