import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Proyecto } from '../_models';

@Injectable()
export class ProyectoService {

  private resourceUrl;

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

}
