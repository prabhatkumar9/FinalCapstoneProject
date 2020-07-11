import { Injectable } from '@angular/core';
import { Register } from '../model/register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  post: any;
  baseUrl: string;

  constructor(private httpClient: HttpClient) {}

  public RegisterNewUser(user: Register): Observable<any> {
    return this.httpClient.post<Register>(
      'http://localhost:8080/api/auth/signup',
      user
    );
  }

  public register(user: Register) {
    return this.httpClient.post<any>(this.baseUrl, user).pipe(
      map(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        }
      )
    );
  }
}
