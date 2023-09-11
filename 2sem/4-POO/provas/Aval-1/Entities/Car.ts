import { Location2D, MoveableObject } from "../common/utils";
import { Place } from "./abstract/Place";
import { Sellable } from "./abstract/Sellable";
import { Garage } from "./places/Garage";
import { User } from "./User";

export class Car extends Sellable implements MoveableObject {
  private _location: Location2D;
  private _avgSpeed: number;
  private _assignedGarage: Place;
  private _owner?: User;
  currentPlace: Place;

  constructor(name: string, avgSpeed: number, price: number, assignedGarage: Place, user?: User) {
    super(name, price);
    this._avgSpeed = avgSpeed;
    this._assignedGarage = assignedGarage;
    this.currentPlace = assignedGarage;
    this._location = assignedGarage.location;
    this._owner = user;
  }

  public GetInfo() {
    return { nome: this.name, velocidade: this._avgSpeed };
  }

  public set owner(owner: User) {
    this._owner = owner;
  }

  public get avgSpeed(): number {
    return this._avgSpeed;
  }

  public AssignGarage(garage: Garage) {
    this._assignedGarage = garage;
  }
}
