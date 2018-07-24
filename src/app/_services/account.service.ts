import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../_models';
import { environment } from '../../environments/environment';

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
    return this.http.get<User>(this.API_URL + 'api/account', { observe: 'response' });
  }

  updateAccount(user:  User): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.API_URL + 'api/account', user, { observe: 'response' });
  }

}
