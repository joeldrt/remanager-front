import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from '../../environments/environment';

import { DtoSvgModel } from '../_models/dto.svg.model';

@Injectable()
export class SvgsService {

  private resourceUrl;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrl = environment.API_URL + 'api/svgs';
  }

  create(code: DtoSvgModel): Observable<HttpResponse<any>> {
    return this.http.post<string>(this.resourceUrl, code, { observe: 'response'});
  }

}
