import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  private API_URL;

  constructor(
    private http: HttpClient,
  ) {
    this.API_URL = environment.API_URL;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.API_URL + 'api/authenticate', { username: username, password: password })
      .pipe(map(token => {
        // login successful if there's a jwt token in the response
        if (token && token.id_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(token));
        }

        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    // remove account from local storage to log user out
    localStorage.removeItem('account');
  }
}
