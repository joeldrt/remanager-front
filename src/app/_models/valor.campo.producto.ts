export const enum EstatusValorCampo {
  'ACTIVO',
  'INACTIVO'
}

export class ValorCampoProducto {
  public id: number;
  public valor?: string;
  public fechaCreacion?: any;
  public correoCreador?: string;
  public estatus?: EstatusValorCampo;
  public productoId?: number;
  public campoId?: number;

  constructor(
  ) {
  }
}
