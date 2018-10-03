export class ImageEnvelope {
  public filename: string;
  public filetype: string;
  public value: string;

  constructor(filename: string, filetype: string, value: string) {
    this.filename = filename;
    this.filetype = filetype;
    this.value = value;
  }
}
