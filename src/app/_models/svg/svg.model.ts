import { Poligono } from './poligono.model';

export class Svg {
  public id?: number;
  public nombre?: string;
  public imagenContentType?: string;
  public imagen?: any;
  public width?: number;
  public height?: number;
  public codigoContentType?: string;
  public codigo?: any;
  public poligonos?: Poligono[];
  public proyectoId?: number;
}
