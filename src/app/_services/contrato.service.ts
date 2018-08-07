import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contrato, PagoReal, PagoProgramado } from '../_models';

import { environment } from '../../environments/environment';

@Injectable()
export class ContratoService {

  private addUrl;
  private findAllUrl;
  private getLastForProductoIdUrl;
  private findAllForProductoIdUrl;
  private addPagoRealUrl;
  private addPagoProgramadoUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.addUrl = environment.API_URL + 'api/contratos';
    this.findAllUrl = environment.API_URL + 'api/contratos/all/';
    this.getLastForProductoIdUrl = environment.API_URL + 'api/contratos/_by_producto_id/recent/';
    this.findAllForProductoIdUrl = environment.API_URL + 'api/contratos/_by_producto_id/all/';
    this.addPagoRealUrl = environment.API_URL + 'api/contratos/_add_pago_real/';
    this.addPagoProgramadoUrl = environment.API_URL + 'api/contrato/_add_pago_programado/';
  }

  create(contrato: Contrato): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.addUrl, contrato, { observe: 'response' });
  }

  // Only for administrator aurthority
  findAll(): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.findAllUrl, { observe: 'response' });
  }

  getLastForProductoId(productoId: string): Observable<HttpResponse<Contrato>> {
    return this.http.get<Contrato>(this.getLastForProductoIdUrl + productoId, { observe: 'response' });
  }

  findAllForProductoId(productoId: string): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.findAllForProductoIdUrl + productoId, { observe: 'response' });
  }

  addPagoReal(contratoId: string, pagoReal: PagoReal): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.addPagoRealUrl + contratoId, pagoReal, { observe: 'response' });
  }

  addPagoProgramado(contratoId: string, pagoProgramado: PagoProgramado): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.addPagoProgramadoUrl + contratoId, pagoProgramado, { observe: 'response' });
  }

}
