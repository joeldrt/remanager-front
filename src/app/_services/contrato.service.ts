import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contrato } from '../_models';

import { environment } from '../../environments/environment';

@Injectable()
export class ContratoService {

  private addUrl;
  private findAllUrl;
  private getLastForProductoIdUrl;
  private findAllForProductoIdUrl;

  constructor(
    private http: HttpClient,
  ){
    this.addUrl = environment.API_URL + 'api/contratos';
    this.findAllUrl = environment.API_URL + 'api/contratos/all/';
    this.getLastForProductoIdUrl = environment.API_URL + 'api/contratos/_by_producto_id/recent/';
    this.findAllForProductoIdUrl = environment.API_URL + 'api/contratos/_by_producto_id/all/';
  }

  create(contrato: Contrato): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.addUrl, contrato, { observe: 'response'});
  }

  // Only for administrator aurthority
  findAll(): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.findAllUrl, { observe: 'response'});
  }

  getLastForProductoId(productoId: string): Observable<HttpResponse<Contrato>> {
    return this.http.get<Contrato>(this.getLastForProductoIdUrl + productoId, { observe: 'response'});
  }

  findAllForProductoId(productoId: string): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.findAllForProductoIdUrl + productoId, { observe: 'response'});
  }
  
}
