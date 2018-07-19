import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from '../../environments/environment';

import { DtoSvgModel } from '../_models/dto.svg.model';
import {User} from '../_models';
import {Proyecto} from '../_models/proyecto';

@Injectable()
export class SvgsService {

  private resourceUrlSvg;
  private resourceUrlProject;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrlSvg = environment.API_URL + 'api/svgs';
    this.resourceUrlProject = environment.API_URL + 'api/proyectos';
  }

  create(svg: DtoSvgModel): Observable<HttpResponse<any>> {
    return this.http.post<string>(this.resourceUrlSvg, svg, { observe: 'response'});
  }

  update(svg: DtoSvgModel): Observable<HttpResponse<any>> {
    return this.http.put<string>(this.resourceUrlSvg, svg, { observe: 'response' });
  }

  getProyecto(idProject: string): Observable<HttpResponse<Proyecto>> {
    return this.http.get<Proyecto>(this.resourceUrlProject + '/' + idProject, { observe: 'response' });
  }

}
