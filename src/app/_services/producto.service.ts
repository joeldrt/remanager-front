import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {Producto, Proyecto} from '../_models';

@Injectable()
export class ProductoService {

  private searchByProyectoIdUrl;

  constructor(
    private http: HttpClient
  ) {
    this.searchByProyectoIdUrl = environment.API_URL + 'api/_search_by_proyectoid/productos/';
  }

  getProductosByProyectoId(proyectoId: number) {
    return this.http.get<Producto[]>(this.searchByProyectoIdUrl + proyectoId, { observe: 'response' });
  }

}
