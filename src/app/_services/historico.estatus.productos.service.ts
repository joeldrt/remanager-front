import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { createRequestOption } from '../_helpers/request-util';

// Services
import { HistoricoEstatusProducto } from '../_models/historico.estatus.producto';

@Injectable()
export class HistoricoEstatusProductosService {

  private resourceUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrl = environment.API_URL;
  }

  searchByIdClient(req?: any): Observable<HttpResponse<HistoricoEstatusProducto[]>> {
    let url = this.resourceUrl;
    if (req) {
      req = 'clienteId=' + req.toString();
    }
    url =  url + 'api/_search/historico-estatus-productos?query=';
    return this.http.get<HistoricoEstatusProducto[]>(url, {params: req, observe: 'response'});
  }// end - searchByIdClient

} // end - HistoricoEstatusProductosService
