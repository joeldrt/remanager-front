export const enum TipoCampo {
  'NUMERO_ENTERO',
  'NUMERO_DECIMAL',
  'VERDADERO_FALSO',
  'TEXTO'
}

export class CampoDeProducto {

  public id: number;
  public tipo: TipoCampo;
  public nombre: string;
  public iconoContentType: string;
  public icono: any;

  constructor(
  ) {
  }

}
