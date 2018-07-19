import { Polygon } from './polygon.model';

export class Svg {
    constructor(
        public codigo?: any,
        public codigoContentType?: string,
        public height?: number,
        public id?: number,
        public imagen?: string,
        public imagenContentType?: string,
        public nombre?: string,
        public poligonos?: Polygon[],
        public width?: number,
    ) {
    }
}
