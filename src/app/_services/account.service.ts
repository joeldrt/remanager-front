import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '../../environments/environment';
import {Organizacion} from '../_models/organizacion';

@Injectable()
export class AccountService {
  private API_URL;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.API_URL = environment.API_URL;
  }

  getAccount(): Observable<HttpResponse<User>> {
    return this.http.get<User>(this.API_URL + 'api/account', { observe: 'response' }).pipe(
      map((response: HttpResponse<User>) => {
        localStorage.setItem('account', JSON.stringify(response.body));
        return response;
      })
    );
  }

  updateAccount(user:  User): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.API_URL + 'api/account', user, { observe: 'response' });
  }

  getAccountOrganization(): Observable<HttpResponse<Organizacion>> {
    return this.http.get<Organizacion>(this.API_URL + 'api/account_organizacion', { observe: 'response' });
  }

}
