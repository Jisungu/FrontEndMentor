import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Auth service
@Injectable({ providedIn: 'root' })

export class AuthService {
  private _loginUrl = '/auth/login';
  constructor(private _http: HttpClient) {}
  // login method
  Login(username: string, password: string): Observable<any> {
    return this._http.post(this._loginUrl, { username, password }).pipe(
      map((response) => {
        // prepare the response to be handled, then return
        return response;
      })
    );
  }
}