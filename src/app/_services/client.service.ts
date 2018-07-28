import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../_models/client';
import { HistoricoEstatusProducto } from '../_models/historico.estatus.producto';
import { PagoProgramado } from '../_models/pago.programado';
import { PagoReal } from '../_models/pago.real';
import { createRequestOption } from '../_helpers/request-util';
import { DigiallDateUtils } from '../../assets/ts/digiall.date.utils';


@Injectable()
export class ClientService {

  private resourceUrl;
  private resourceSearchUrl;
  private resourceSearchByCv;

  constructor(
    private http: HttpClient,
    private dateUtils: DigiallDateUtils
  ){
    this.resourceUrl = environment.API_URL + 'api/clientes';
    this.resourceSearchUrl = environment.API_URL + 'api/_search/clientes';
    this.resourceSearchByCv = environment.API_URL + 'api/_search_by_cv/clientes/';
  }

  create(client: Client): Observable<HttpResponse<Client>> {
    const copy = this.convert(client);
    return this.http.post<Client>(this.resourceUrl, copy, { observe: 'response' });
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

  search(req?: any): Observable<HttpResponse<Client[]>>{
    const options = createRequestOption(req);
    return this.http.get<Client[]>(this.resourceSearchUrl, { params: options, observe: 'response'});
  }

  searchByCv(req?: any): Observable<HttpResponse<Client[]>>{
    return this.http.get<Client[]>(this.resourceSearchByCv + req, { observe: 'response'});
  }

  getClients(): Observable<HttpResponse<Client[]>>{
    return this.http.get<Client[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  /*
  * **
  */
  private convert(cliente: Client): Client {
    const copy: Client = Object.assign({}, cliente);
    if(cliente.fechaAlta) {
      copy.fechaAlta = this.dateUtils.toDate(cliente.fechaAlta);
    }
    if(cliente.fechaNacimiento) {
      copy.fechaNacimiento = this.dateUtils.toDate(cliente.fechaNacimiento);
    }
    return copy;
  }

}
