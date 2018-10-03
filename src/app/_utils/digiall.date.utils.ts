import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DigiallDateUtils {

  //
  toDate(date: any): Date {
    if (date === undefined || date === null) {
      return null;
    }

    const dateParts = date.toLocaleString().split(/\D+/);

    if (dateParts.length === 7) {
      return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5], dateParts[6]);
    }

    if (dateParts.length === 6) {
      if (dateParts[0].length === 1) {
        dateParts[0] = '0' + dateParts[0];
      }
      if (dateParts[1].length === 1) {
        dateParts[1] = '0' + dateParts[1];
      }
      if (dateParts[3].length === 1) {
        dateParts[3] = '0' + dateParts[3];
      }
      if (dateParts[4].length === 1) {
        dateParts[4] = '0' + dateParts[4];
      }
      if (dateParts[5].length === 1) {
        dateParts[5] = '0' + dateParts[5];
      }

      /*let dateString = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T' + dateParts[3]
        + ':' + dateParts[4] + ':' + dateParts[5] + '-05:00';*/
      const dateString = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];

      return new Date(dateString);
    }

    if (dateParts.length === 3) {
      if (dateParts[0].lenght === 1) {
        dateParts[0] = '0' + dateParts[0];
      }
      if (dateParts[1].lenght === 1) {
        dateParts[1] = '0' + dateParts[1];
      }
      if (dateParts[2].length === 1) {
        dateParts[2] = '0' + dateParts[2];
      }

      const dateString = dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2];

      return new Date(dateString);
    }

    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4]);
  }// end - toDate

}
