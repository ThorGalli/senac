import {
  calculateDistance,
  calculateTravelTime,
  Location2D,
  MoveableObject,
  RandomInt,
} from "../common/utils";
import { Place } from "./abstract/Place";
import { Sellable } from "./abstract/Sellable";
import { Car } from "./Car";
import { Garage } from "./places/Garage";
import { Shop } from "./places/Shop";
import PromptSync from "prompt-sync";

export class User implements MoveableObject {
  private _name: string;
  private _garages: Garage[] = [];
  private _cars: Car[] = [];
  private _currentCar: Car | undefined;
  private _cash: number;
  currentPlace: Place;

  constructor(name: string, place: Place) {
    this._name = name;
    this.currentPlace = place;
    this._cash = RandomInt(200, 1199);
  }

  public get cash(): number {
    return this._cash;
  }

  public get garages(): Garage[] {
    return this._garages;
  }

  public TravelTo(place: Place) {
    if (this.currentCar) {
      const distance = calculateDistance(this.currentPlace.location, place.location);
      const time = calculateTravelTime(distance, this.currentCar.avgSpeed);
      return { time, msg: "A viagem demoraria " + time + " segundos..." };
    }

    return { time: 0, msg: "Andar a pé ainda não foi implementado! TODO:" };
  }

  public AddGarage(garage: Garage) {
    this._garages.push(garage);
  }

  public get name(): string {
    return this._name;
  }

  public get currentCar(): Car | undefined {
    return this._currentCar;
  }

  public set currentCar(car: Car | undefined) {
    this._currentCar = car;
  }

  public BuyItem(shop: Shop, item: Sellable) {
    if (this._cash < item.price) return { item: null, msg: "Dinheiro insuficiente..." };

    if (item instanceof Car) {
      const car: Car = item;
      this._cars.push(car);
      car.owner = this;
    }

    this._cash -= item.price;
    return { item, msg: item.name + " comprado com sucesso" };
  }

  public GetInfo() {
    const report = `Nome: ${this.name} | Veículo: ${
      this.currentCar?.name || "a pé"
    } | Dinheiro: C$ ${this._cash.toFixed(2)} | Local: ${this.currentPlace.name}`;
    return report;
  }
}
