import { Injectable } from '@angular/core';

@Injectable()
export class ProductUtils {

  colorByStatus(status: string): string {
    let color_to_return = 'white';
    switch (status) {
      case 'DISPONIBLE': {
        color_to_return = 'green'; // verde
        break;
      }
      case 'APARTADO': {
        color_to_return = 'yellow'; // amarillo
        break;
      }
      case 'BLOQUEADO': {
        color_to_return = 'red'; // rojo
        break;
      }
      case 'VENDIDO': {
        color_to_return = 'gray'; // gris
        break;
      }
    }
    return color_to_return;
  }


}
