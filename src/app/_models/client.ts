import { HistoricoEstatusProducto } from './historico.estatus.producto';
import { PagoProgramado } from './pago.programado';
import { PagoReal } from './pago.real';

export class Client {
  public apellidos?: string;
  public correoVendedor?: string;
  public direccion?: string;
  public fechaAlta?: any;
  public fechaNacimiento?: any;
  public id?: number;
  public nombre?: string;
  public organizacionId?: number;
  public telefono?: number;
  public email?: string;
  public historicoProductos?: HistoricoEstatusProducto[];
  public pagosProgramados?: PagoProgramado[];
  public pagosReales?: PagoReal[];
}


