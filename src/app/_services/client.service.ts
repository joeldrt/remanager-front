import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Client } from '../_models/client';
import { HistoricoEstatusProducto } from '../_models/historico.estatus.producto';
import { PagoProgramado } from '../_models/pago.programado';
import { PagoReal } from '../_models/pago.real';

import { createRequestOption } from '../_helpers/request-util';


@Injectable()
export class ClientService {

  private resourceUrl;

  constructor(
    private http: HttpClient
  ){
    this.resourceUrl = environment.API_URL + 'api/clientes';
  }

  create(client: Client): Observable<HttpResponse<Client>> {
    return this.http.post<Client>(this.resourceUrl, client, { observe: 'response' });
  }

  update(client: Client): Observable<HttpResponse<Client>> {
    return this.http.put<Client>(this.resourceUrl, client, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<Client>> {
    return this.http.get<Client>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Client[]>> {
    const options = createRequestOption(req);
    return this.http.get<Client[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getClients(): Observable<HttpResponse<Client[]>>{
    return this.http.get<Client[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
