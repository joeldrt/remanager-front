import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class SellersService {
  private resourceUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.resourceUrl = environment.API_URL + 'api/usuarios/';
  }

  getAll(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.resourceUrl, { observe: 'response' });
  }

}
