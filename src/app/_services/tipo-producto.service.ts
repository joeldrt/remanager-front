import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { TipoProducto } from '../_models/tipo.producto';


@Injectable()
export class TipoProductoService {

  private resourceUrl =  environment.API_URL + 'api/tipo-productos';

  constructor(private http: HttpClient) { }

  find(id: number): Observable<HttpResponse<TipoProducto>> {
    return this.http.get<TipoProducto>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }
}
