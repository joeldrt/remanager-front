export const enum EstatusPagoReal {
  'PENDIENTE_VERIFICACION',
  'VERIFICADO',
  'DESCARTADO'
}

export class PagoReal {
  constructor(
    public id?: number,
    public estatusPago?: EstatusPagoReal,
    public fechaRecepcion?: any,
    public fechaConfirmacion?: any,
    public monto?: number,
    public notas?: string,
    public comprobanteContentType?: string,
    public comprobante?: any,
    public clienteId?: number,
    public productoId?: number,
  ) {
  }
}
