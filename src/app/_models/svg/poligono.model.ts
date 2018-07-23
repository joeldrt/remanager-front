import { Punto } from './punto.model';

export class Poligono {
  public id?: number;
  public puntos?: string;
  public genUid?: string;
  public status?: string;
  public arregloPuntos?: Punto[];
  public svgId?: number;
}
