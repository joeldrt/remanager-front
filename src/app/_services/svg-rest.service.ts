import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Svg } from '../_models';

@Injectable()
export class SvgRestService {

  private searchServiceUrl;

  constructor(
    private http: HttpClient
  ) {
    this.searchServiceUrl = environment.API_URL + 'api/svgs';
  }

  getSvgById(svgId: number): Observable<HttpResponse<Svg>> {
    return this.http.get<Svg>(this.searchServiceUrl + '/' + svgId, { observe: 'response' });
  }
}
