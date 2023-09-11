import GenericModel from "./abstract/GenericModel";

export default class Subject extends GenericModel {
  private _url: string;
  
  constructor(id: number, name: string, url: string) {
    super(id, name);
    this._url = url;
  }
}
