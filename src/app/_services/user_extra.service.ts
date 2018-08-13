import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { UserExtra } from '../_models/';

@Injectable()
export class UserExtraService {

  private userExtraResourceUrl;
  private userExtraPicturesResourceUrl;
  private userExtraProfilePictureResourceUrl;

  constructor(
    private http: HttpClient,
  ){
    this.userExtraResourceUrl = environment.API_URL + 'api/user_extra';
    this.userExtraPicturesResourceUrl = environment.API_URL + 'api/user_extra/pictures';
    this.userExtraProfilePictureResourceUrl = environment.API_URL + 'api/user_extra/profile_pic';
  }

  getUserExtra(): Observable<HttpResponse<UserExtra>> {
    return this.http.get<UserExtra>(this.userExtraResourceUrl, { observe: 'response' });
  }

  updateUserExtraPicturesUrls(picturesUrls: string[]): Observable<HttpResponse<UserExtra>> {
    const object = { 'picturesUrls': picturesUrls }
    return this.http.put<UserExtra>(this.userExtraPicturesResourceUrl, object, { observe: 'response' });
  }

  changeProfilePicture(profilePictureUrl: string): Observable<HttpResponse<UserExtra>> {
    const object = { 'profilePictureUrl': profilePictureUrl}
    return this.http.put<UserExtra>(this.userExtraProfilePictureResourceUrl, object, { observe: 'response' });
  }
}
