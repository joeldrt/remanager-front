import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from '../../environments/environment';

import { DtoSvgModel } from '../_models/dto.svg.model';
import {User} from '../_models';

@Injectable()
export class SvgsService {

  private resourceUrl;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrl = environment.API_URL + 'api/svgs';
  }

  create(svg: DtoSvgModel): Observable<HttpResponse<any>> {
    return this.http.post<string>(this.resourceUrl, svg, { observe: 'response'});
  }

  update(svg: DtoSvgModel): Observable<HttpResponse<any>> {
    return this.http.put<string>(this.resourceUrl, svg, { observe: 'response' });
  }

}
