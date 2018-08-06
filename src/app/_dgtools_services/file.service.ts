import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { FileEnvelope } from '../_dgtools_models';

@Injectable()
export class FileService {

  private addFileResourceUrl;

  constructor(
    private http: HttpClient,
  ){
    this.addFileResourceUrl = environment.API_URL + 'api/file/upload';
  }

  uploadFiles(folder: string, files: FileEnvelope[]): Observable<HttpResponse<string[]>> {
    const sending_object = { 'folder': folder, 'files': files };
    return this.http.put<string[]>(this.addFileResourceUrl, sending_object, { observe: 'response'});
  }

}
