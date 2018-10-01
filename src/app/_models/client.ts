import { ResumenContrato } from './contrato';

export class Client {
  public id?: string;
  public fechaAlta?: string;
  public correoVendedor?: string;
  public organizacionId?: number;
  public email?: string;
  public nombre?: string;
  public apellidos?: string;
  public fechaNacimiento?: string;
  public direccion?: string;
  public telefono?: number;
}

export class ResumenContratosPorCliente {
  public cliente?: Client;
  public resumen_contrato?:  ResumenContrato;
}


