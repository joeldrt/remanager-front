import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client, ResumenContratosPorCliente } from '../_models/client';
import { DigiallDateUtils } from '../../assets/ts/digiall.date.utils';


@Injectable()
export class ClientService {

  private resourceUrl;
  private resourceSearchByCv;

  constructor(
    private http: HttpClient,
    private dateUtils: DigiallDateUtils
  ) {
    this.resourceUrl = environment.API_URL + 'api/clientes';
    this.resourceSearchByCv = environment.API_URL + 'api/_search_by_cv/clientes';
  }

  create(client: Client): Observable<HttpResponse<Client>> {
    return this.http.post<Client>(this.resourceUrl, client, { observe: 'response' }).pipe(
      map(data => {
        if (data.body.fechaNacimiento) {
          data.body.fechaNacimiento = data.body.fechaNacimiento.split('T')[0];
        }
        return data;
      })
    );
  }

  update(client: Client): Observable<HttpResponse<Client>> {
    return this.http.put<Client>(this.resourceUrl, client, { observe: 'response' }).pipe(
      map(data => {
        if (data.body.fechaNacimiento) {
          data.body.fechaNacimiento = data.body.fechaNacimiento.split('T')[0];
        }
        return data;
      })
    );
  }

  find(cliente_id: string): Observable<HttpResponse<Client>> {
    return this.http.get<Client>(this.resourceUrl + '/' + cliente_id, { observe: 'response' }).pipe(
      map(data => {
        if (data.body.fechaNacimiento) {
          data.body.fechaNacimiento = data.body.fechaNacimiento.split('T')[0];
        }
        return data;
      })
    );
  }

  searchByCv(req?: any): Observable<HttpResponse<Client[]>> {
    return this.http.get<Client[]>(this.resourceSearchByCv, { observe: 'response'});
  }

  getClients(): Observable<HttpResponse<Client[]>> {
    return this.http.get<Client[]>(this.resourceUrl, { observe: 'response' });
  }

  borrar(cliente_id: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.resourceUrl + '/' + cliente_id, { observe: 'response' });
  }

  editar(cliente: Client): Observable<HttpResponse<Client>> {
    return this.http.put<Client>(this.resourceUrl + '/' + cliente.id, cliente, {observe: 'response'}).pipe(
      map(data => {
        if (data.body.fechaNacimiento) {
          data.body.fechaNacimiento = data.body.fechaNacimiento.split('T')[0];
        }
        return data;
      })
    );
  }

  obtenerResumenContratosPorCliente(cliente_id: string): Observable<HttpResponse<ResumenContratosPorCliente>> {
    return this.http.get(this.resourceUrl + '/' + cliente_id + '/contratos', {observe: 'response'});
  }

}
