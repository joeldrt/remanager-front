import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HeaderHelper {

  private subject = new Subject<any>();

  constructor() {
  }

  public getHeaderRequest() {
    return this.subject.asObservable();
  }

  public sendHeaderTitleRequest(headerTitle: string) {
    this.subject.next({ headerTitle: headerTitle});
  }

}
