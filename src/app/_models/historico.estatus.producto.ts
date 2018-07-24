
export const enum EstatusDeProducto {
  'DISPONIBLE',
  'APARTADO',
  'BLOQUEADO',
  'VENDIDO'
}

export const enum EstatusRegistroHistorico {
  'PASADO',
  'PRESENTE'
}

export class HistoricoEstatusProducto {
  constructor(
    public id?: number,
    public tipoEstatus?: EstatusDeProducto,
    public correoVendedor?: string,
    public fechaInicio?: any,
    public estatus?: EstatusRegistroHistorico,
    public tiempoDeVidaDias?: number,
    public clienteId?: number,
    public productoId?: number,
  ) {
  }
}
