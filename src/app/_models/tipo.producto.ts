import { CampoDeProducto } from './campo.de.producto';

export class TipoProducto {

  public id: number;
  public nombre: string;
  public camposDeProductos: CampoDeProducto[];
  public organizacionId: number;
  public organizacionNombre: string;

  constructor(
  ) {
  }

}
