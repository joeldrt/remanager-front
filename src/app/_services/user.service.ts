import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { User } from '../_models';
import { createRequestOption } from '../_helpers/request-util';


@Injectable()
export class UserService {

  private resourceUrl;
  private resourceUrlUserApi;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrl = environment.API_URL + 'api/users';
  }

  create(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
  }

}
