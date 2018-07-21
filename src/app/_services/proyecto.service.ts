import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Proyecto } from '../_models';

@Injectable()
export class ProyectoService {

  private searchRoot;
  private searchByPadreIdUrl;

  constructor(
    private http: HttpClient
  ) {
    this.searchRoot = environment.API_URL + 'api/_search_root/proyectos';
    this.searchByPadreIdUrl = environment.API_URL + 'api/_search_by_padreid/proyectos/';
  }

  getAllRootProyects(): Observable<HttpResponse<Proyecto[]>> {
    return this.http.get<Proyecto[]>(this.searchRoot, { observe: 'response' });
  }

  getProyectosByParentId(idPadre: number) {
    return this.http.get<Proyecto[]>(this.searchByPadreIdUrl + idPadre, { observe: 'response' });
  }

}
