import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
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
    this.resourceUrl = environment.API_URL + 'api/usuarios/';
  }

  create(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.resourceUrl + user.id, user, { observe: 'response' });
  }

  obtener(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.resourceUrl, { observe: 'response' });
  }

  modificarActivado(user_id: string, status: boolean): Observable<HttpResponse<any>> {
    const object = { 'status': status };
    return this.http.put<any>(this.resourceUrl + user_id + '/activated', object, { observe: 'response' });
  }

  modificarPassword(user_id: string, password: string): Observable<HttpResponse<any>> {
    const object = { 'new_password': password };
    return this.http.put<any>(this.resourceUrl + user_id + '/password', object, { observe: 'response' });
  }

  borrar(user_id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + user_id, { observe: 'response' });
  }

}
