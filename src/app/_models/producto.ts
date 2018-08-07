import {PagoReal} from './pago.real';
import {PagoProgramado} from './pago.programado';

export const enum EstatusDeProducto {
    'DISPONIBLE',
    'APARTADO',
    'BLOQUEADO',
    'VENDIDO'
}

export class ValorCampo {
    constructor(
        public fechaCreacion?: any,

        public nombre?: string,
        public valor?: string,
        public icono?: string,
        public tipoCampo?: string,
    ){
    }
}

export class Producto {
    constructor(
        public fechaCreacion?: any,

        public id?: string,
        public proyectoId?: string,
        public organizacionId?: string,

        public nombre?: string,
        public descripcion?: string,
        public estatus?: EstatusDeProducto,
        public correoCreador?: string,
        public idSeccion?: string,
        public precio?: number,
        public tipoDeProducto?: string,
        public historials?: any[], // cambiar al tipo de entidad necesaria
        public valoresCampos?: ValorCampo[], // cambiar al tipo de entidad necesaria
        public fotos?: string[],
        public archivos?: string[], // cambiar al tipo de entidad necesaria
        public pagosProgramados?: PagoProgramado[], // cambiar al tipo de entidad necesaria
        public pagosReales?: PagoReal[], // cambiar al tipo de entidad necesaria
    ) {
    }
}
