import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '../../environments/environment';
import { Organizacion } from '../_models/organizacion';

@Injectable()
export class AccountService {
  private API_URL;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.API_URL = environment.API_URL + 'api/sesion/';
  }

  getAccount(): Observable<HttpResponse<User>> {
    return this.http.get<User>(this.API_URL + 'cuenta', { observe: 'response' }).pipe(
      map((response: HttpResponse<User>) => {
        localStorage.setItem('account', JSON.stringify(response.body));
        return response;
      })
    );
  }

  updateAccount(user:  User): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.API_URL + 'cuenta', user, { observe: 'response' });
  }

  getAccountOrganization(): Observable<HttpResponse<Organizacion>> {
    return this.http.get<Organizacion>(this.API_URL + 'organizacion', { observe: 'response' });
  }

  hasAuthority(authority: string): boolean {
    if (localStorage.getItem('account') == null) {
      return false;
    }
    var user: User = JSON.parse(localStorage.getItem('account'));
    for (const key in user.authorities) {
      if (user.authorities[key] === authority) {
        return true;
      }
    }
    return false;
  }

  getStoredAccount(): User {
    if (localStorage.getItem('account') != null) {
      var user: User = JSON.parse(localStorage.getItem('account'));
      return user;
    }
    return null;
  }

}
