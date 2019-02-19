import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Producto, Proyecto } from '../_models';

@Injectable()
export class ProductoService {

  private resourceProductosUrl;
  private resourceProyectosUrl;

  constructor(
    private http: HttpClient
  ) {
    this.resourceProductosUrl = environment.API_URL + 'api/productos/';
    this.resourceProyectosUrl = environment.API_URL + 'api/proyectos/';
  }

  getProductosByProyectoId(proyectoId: any): Observable<HttpResponse<Producto[]>> {
    return this.http.get<Producto[]>(this.resourceProyectosUrl + proyectoId + '/productos', {observe: 'response'});
  }
  
  getProductosByIdSeccion(id_seccion: any): Observable<HttpResponse<Producto[]>> {
    return this.http.get<Producto[]>(this.resourceProyectosUrl + '?id_seccion=' + id_seccion, {observe: 'response'});
  }

  getProductosById(producto_id: any): Observable<HttpResponse<Producto>> {
    return this.http.get<Producto>(this.resourceProductosUrl + producto_id, {observe: 'response'});
  }

  findAllByOrganizacion(organizacion_id: string): Observable<HttpResponse<Producto[]>> {
    return this.http.get<Producto[]>(this.resourceProductosUrl, {observe: 'response'});
  }

  editarProducto(producto: Producto): Observable<HttpResponse<Producto>> {
    return this.http.put<Producto>(this.resourceProductosUrl + producto.id, producto, { observe: 'response' });
  }

}
