export default class User {
  // Atributos
  private _userName: string;
  private inventory: Array<any>;
  private _cash: number;

  // Construtor
  constructor(userName: string) {
    this._cash = 0;
    this._userName = userName;
    this.inventory = [];
  }

  // Métodos
  public get userName(): string {
    return this._userName;
  }

  public changeUserName(userName: string) {
    this._userName = userName;
  }
}
