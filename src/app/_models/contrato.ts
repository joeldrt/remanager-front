
export class PagoReal {
  public fechaCreacion?: any; // No se llena, solo para lectura... llenado por el servidor
  public monto?: number;
  public correoQueValida?: string;
  public validado?: boolean;
  public archivos?: string[];
}

export class PagoProgramado {
  public fechaCompromisoPago?: any;
  public monto?: number;
}

export enum TipoContrato {
  BLOQUEO='BLOQUEO',
  APARTADO='APARTADO',
  VENTA='VENTA',
  DEVOLUCION='DEVOLUCION',
  CORRIDA='CORRIDA',
}

export class Contrato {
  public id?: string;
  public fechaCreacion?: any; // No se llena, solo para lectura... llenado por el servidor
  public tipo?: TipoContrato;
  public clienteId?: string;
  public productoId?: string;
  public vendedorId?: number; // No se llena, solo para lectura... llenado por el servidor
  public diasValidez?: number;
  public pagosProgramados?: PagoProgramado[];
  public pagosReales?: PagoReal[];
  public activo?: boolean;
}
