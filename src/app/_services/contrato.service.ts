import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contrato, PagoReal, PagoProgramado } from '../_models';

import { environment } from '../../environments/environment';

@Injectable()
export class ContratoService {

  private resourceContratoUrl;
  private resourceProductoUrl;
  private resourceClienteUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.resourceContratoUrl = environment.API_URL + 'api/contratos/';
    this.resourceProductoUrl = environment.API_URL + 'api/producto/';
    this.resourceClienteUrl = environment.API_URL + 'api/clientes/';
  }

  create(contrato: Contrato): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.resourceContratoUrl, contrato, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.resourceContratoUrl, {observe: 'response'});
  }

  findAllForProductoId(productoId: string): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.resourceProductoUrl + productoId + '/contratos', {observe: 'response'});
  }


  addPagoReal(contratoId: string, pagoReal: PagoReal): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.resourceContratoUrl + contratoId + '/pagosreales', pagoReal, {observe: 'response'});
  }

  /*
  addPagoProgramado(contratoId: string, pagoProgramado: PagoProgramado): Observable<HttpResponse<Contrato>> {
    return this.http.post<Contrato>(this.addPagoProgramadoUrl + '/' + contratoId, pagoProgramado, {observe: 'response'});
  }
  */

  findAllForClienteId(clienteId: string): Observable<HttpResponse<Contrato[]>> {
    return this.http.get<Contrato[]>(this.resourceClienteUrl + clienteId, {observe: 'response'});
  }

  getContractForId(contractId: string): Observable<HttpResponse<Contrato>> {
    return this.http.get<Contrato>(this.resourceContratoUrl + contractId, {observe: 'response'});
  }

  desactivar(contrato_id: string): Observable<HttpResponse<Contrato>> {
    return this.http.put<Contrato>(this.resourceContratoUrl + contrato_id + '?desactivar=true', null, {observe: 'response'});
  }

}
