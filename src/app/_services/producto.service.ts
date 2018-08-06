import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Producto, Proyecto } from '../_models';

@Injectable()
export class ProductoService {

  private productoResourceUrl;
  private searchByProyectoIdUrl;

  constructor(
    private http: HttpClient
  ) {
    this.productoResourceUrl = environment.API_URL + 'api/productos/';
    this.searchByProyectoIdUrl = environment.API_URL + 'api/_search_by_proyectoid/productos/';
  }

  getProductosByProyectoId(proyectoId: number): Observable<HttpResponse<Producto[]>> {
    return this.http.get<Producto[]>(this.searchByProyectoIdUrl + proyectoId, { observe: 'response' });
  }

  getProductosById(producto_id: string): Observable<HttpResponse<Producto>> {
    return this.http.get<Producto>(this.productoResourceUrl + producto_id, { observe: 'response' });
  }

  findAllByOrganizacion(organizacionId: number): Observable<HttpResponse<Producto[]>> {
    return this.http.get<Producto[]>(this.productoResourceUrl, { observe: 'response' });
  }
}
