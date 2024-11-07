import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    public _router: Router
  ) {}

  userLogin(payload: any) {
    return this._http.post<any>(`${environment.apiEndpoint}/auth/login`, payload)
    .pipe(
      map((loginResponse) => {

        if (loginResponse.code == 200) {
          localStorage.setItem('access_token', loginResponse.response.access_token);
        }
        
        return loginResponse;
      })
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  refreshToken() {

    const payload = '';

    return this._http
    .post<any>(`${environment.apiEndpoint}/auth/refresh`, payload)
    .pipe(
      map((refreshResponse) => {

        if (refreshResponse.code == 200) {
          localStorage.setItem('access_token', refreshResponse.response.access_token);
          return refreshResponse.access_token
        }
      })
    );
  }

  userLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeRefreshToken = localStorage.removeItem('refresh_token');
    if (removeToken == null && removeRefreshToken == null) {
      this._router.navigate(['/login']);
    }
  }
}
