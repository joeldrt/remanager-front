
export const enum EstatusDeProducto {
    DISPONIBLE = 'DISPONIBLE',
    APARTADO = 'APARTADO',
    BLOQUEADO = 'BLOQUEADO',
    VENDIDO = 'VENDIDO'
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
    ) {
    }
}
