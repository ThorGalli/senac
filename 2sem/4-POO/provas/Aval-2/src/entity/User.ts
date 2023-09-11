import { Entity, Column } from "typeorm";
import { calculateDistance, calculateTravelTime, Location, Status } from "../common/TravelHelper";
import BaseObject from "./abstract/BaseObject";
import { Car } from "./Car";
import { Garage } from "./places/Garage";
import { Inventory } from "./Inventory";

@Entity()
export class User extends BaseObject {
  @Column()
  location: Location;

  @Column()
  status: Status;

  @Column()
  email: string;

  @Column()
  cash: number;

  @Column()
  garages: Garage[];

  @Column()
  cars: Car[];

  @Column()
  inventory: Inventory;

  constructor(name: string, email: string, location: Location) {
    super(name);
    this.status = Status.STATIONARY;
    this.email = email;
    this.location = location;
    this.cash = 0;
  }

  public travelTo(destination: Location, car: Car) {
    // this.status = Status.TRAVELING;
    const distance = calculateDistance(this.location, destination);
    const time = calculateTravelTime(distance, car.avgSpeed);
    console.log("Travel will take " + time + " seconds");
  }
}
