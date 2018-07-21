export const enum EstatusDeProducto {
    'DISPONIBLE',
    'APARTADO',
    'BLOQUEADO',
    'VENDIDO'
}

export class Producto {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public estatus?: EstatusDeProducto,
        public fechaCreacion?: any,
        public correoCreador?: string,
        public idSeccion?: string,
        public precio?: number,
        public tipoDeProductoId?: number,
        public historials?: any[], // cambiar al tipo de entidad necesaria
        public valoresCampos?: any[], // cambiar al tipo de entidad necesaria
        public archivos?: any[], // cambiar al tipo de entidad necesaria
        public pagosProgramados?: any[], // cambiar al tipo de entidad necesaria
        public pagosReales?: any[], // cambiar al tipo de entidad necesaria
        public proyectoId?: number,
        public tipoDeProductoNombre?: string,
        public proyectoNombre?: string,
    ) {
    }
}
