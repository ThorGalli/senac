export class Image {
  private _name: string;
  private _description: string;
  private _filePath: string;
  constructor(name: string, description: string, filename: string) {
    this._name = name;
    this._description = description;
    this._filePath = "placeholder";
  }

  public get description(): string {
    return this._description;
  }
}
