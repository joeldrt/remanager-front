
export const enum EstatusDeProducto {
  DISPONIBLE = 'DISPONIBLE',
  APARTADO = 'APARTADO',
  BLOQUEADO = 'BLOQUEADO',
  VENDIDO = 'VENDIDO',
}

export class ValorCampo {
  public fechaCreacion?: Date;
  public nombre?: string;
  public valor?: string;
  public icono?: string;
  public tipoCampo?: string;
}// - end - ValorCampo

export class Producto {
  public fechaCreacion?: Date;

  public id?: string;
  public proyectoId?: string;
  public organizacionId?: string;

  public nombre?: string;
  public descripcion?: string;
  public estatus?: EstatusDeProducto;
  public correoCreador?: string;
  public idSeccion?: string;
  public precio?: number;
  public tipoDeProducto?: string;
  public valoresCampos?: ValorCampo[]; // cambiar al tipo de entidad necesaria
  public fotos?: string[];
  public archivos?: string[]; // cambiar al tipo de entidad necesaria
}
