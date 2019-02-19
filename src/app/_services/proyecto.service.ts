import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Proyecto } from '../_models';

@Injectable()
export class ProyectoService {

  private resourceUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrl = environment.API_URL + 'api/proyectos/';
  }

  getAllRootProyects(): Observable<HttpResponse<Proyecto[]>> {
    return this.http.get<Proyecto[]>(this.resourceUrl + '?proyecto_raiz=true', { observe: 'response' });
  }

  getProyectosByParentId(idPadre: any): Observable<HttpResponse<Proyecto[]>> {
    return this.http.get<Proyecto[]>(this.resourceUrl + '?padre_id=' + idPadre, { observe: 'response' });
  }
  
  getProyectosByIdSeccion(idSeccion: any): Observable<HttpResponse<Proyecto[]>> {
    return this.http.get<Proyecto[]>(this.resourceUrl + '?id_seccion=' + idSeccion, { observe: 'response' });
  }

  getProyectoById(proyecto_id: any): Observable<HttpResponse<Proyecto>> {
    return this.http.get<Proyecto>(this.resourceUrl + proyecto_id, { observe: 'response' });
  }

  guardarProyecto(proyecto: Proyecto): Observable<HttpResponse<Proyecto>> {
    return this.http.post<Proyecto>(this.resourceUrl, proyecto, { observe: 'response' });
  }

  editarProyecto(proyecto: Proyecto): Observable<HttpResponse<Proyecto>> {
    return this.http.put<Proyecto>(this.resourceUrl + proyecto.id, proyecto, { observe: 'response' });
  }

  borrarProyecto(proyecto_id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + proyecto_id, { observe: 'response' });
  }

}
