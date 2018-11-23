import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Svg } from '../_models';

@Injectable()
export class SvgRestService {

  private resourceUrl;

  constructor(
    private http: HttpClient
  ) {
    this.resourceUrl = environment.API_URL + 'api/svgs/';
  }

  createSvg(svg: Svg): Observable<HttpResponse<Svg>> {
    return this.http.post<Svg>(this.resourceUrl, svg, {observe: 'response'});
  }

  getAllSvgs(): Observable<HttpResponse<Svg[]>> {
    return this.http.get<Svg[]>(this.resourceUrl, {observe: 'response'});
  }

  getSvgById(svgId: String): Observable<HttpResponse<Svg>> {
    return this.http.get<Svg>(this.resourceUrl + svgId, {observe: 'response'});
  }

  updateSvg(svg: Svg): Observable<HttpResponse<Svg>> {
    return this.http.put<Svg>(this.resourceUrl + svg.id, svg, {observe: 'response'});
  }

  deleteSvg(svg_id: String): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + svg_id, {observe: 'response'});
  }

}
