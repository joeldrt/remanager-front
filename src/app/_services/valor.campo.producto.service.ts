import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ValorCampoProducto } from '../_models/valor.campo.producto';

@Injectable()
export class ValorCampoProductoService {

  private resourceByProductUrl = environment.API_URL + 'api/valor-campo-productos-by-productid';

  constructor(
    private http: HttpClient,
  ) {
  }

  findAllByProducto(productoId: number):  Observable<HttpResponse<ValorCampoProducto[]>> {
    return this.http.get<ValorCampoProducto[]>(
      this.resourceByProductUrl + '/' + productoId, { observe: 'response'}
      );
  }
}
