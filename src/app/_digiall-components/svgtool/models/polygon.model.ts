import { Punto } from './punto.model';

export class Polygon {
    constructor(
        public arregloPuntos?: Punto[],
        public genUid?: number,
        public id?: number,
        public puntos?: string,
        public status?: string,
        public svgId?: number,
    ) {
    }
}
