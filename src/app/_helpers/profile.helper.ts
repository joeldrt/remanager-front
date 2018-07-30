import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProfileHelper {

  private subject = new Subject<any>();

  constructor() {
  }

  public getProfileRequest() {
    return this.subject.asObservable();
  }

  public sendProfileChangeRequest(userId: number) {
    this.subject.next({ userId: userId});
  }

}
