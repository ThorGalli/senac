export default abstract class GenericModel {
  protected _id: number;
  protected _name: string;
  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }
}
