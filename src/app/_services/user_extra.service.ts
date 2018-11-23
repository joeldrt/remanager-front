import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { UserExtra } from '../_models/';

@Injectable()
export class UserExtraService {

  private resourceUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.resourceUrl = environment.API_URL + 'api/usuario/extra/';
  }

  getUserExtra(): Observable<HttpResponse<UserExtra>> {
    return this.http.get<UserExtra>(this.resourceUrl, { observe: 'response' });
  }

  updateUserExtraPicturesUrls(picturesUrls: string[]): Observable<HttpResponse<UserExtra>> {
    const object = { 'picturesUrls': picturesUrls };
    return this.http.put<UserExtra>(this.resourceUrl + 'pictures', object, { observe: 'response' });
  }

  changeProfilePicture(profilePictureUrl: string): Observable<HttpResponse<UserExtra>> {
    const object = { 'profilePictureUrl': profilePictureUrl};
    return this.http.put<UserExtra>(this.resourceUrl + 'profile_picture', object, { observe: 'response' });
  }
}
