import { Producto } from './producto';

export class PagoReal {
  public uuid: string;
  public fechaCreacion?: Date; // No se llena, solo para lectura... llenado por el servidor
  public monto?: number;
  public correoQueValida?: string;
  public validado?: boolean;
  public archivos?: string[];
}

export class PagoProgramado {
  public uuid: string;
  public fechaCompromisoPago?: Date;
  public monto?: number;
}

export enum TipoContrato {
  BLOQUEO = 'BLOQUEO', // gris
  APARTADO = 'APARTADO', // amarilo
  VENTA = 'VENTA', // verde
  DEVOLUCION = 'DEVOLUCION', // negro
  CORRIDA = 'CORRIDA', // azul
}

export class Contrato {
  public id?: string; // NO se llena, solo para lectura... llenado por el servidor
  public fechaCreacion?: Date; // No se llena, solo para lectura... llenado por el servidor
  public tipo?: TipoContrato;
  public clienteId?: string;
  public productoId?: string;
  public correoVendedor?: string; // No se llena, solo para lectura... llenado por el servidor
  public diasValidez?: number;
  public pagosProgramados?: PagoProgramado[];
  public pagosReales?: PagoReal[];
  public activo?: boolean; // No se llena, el servidor lo ajusta según recibe los contratos
}

export class ResumenContrato {
  public contrato?: Contrato;
  public producto?: Producto;
}
