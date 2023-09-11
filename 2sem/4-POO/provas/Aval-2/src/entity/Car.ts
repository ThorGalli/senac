import { Column, Entity } from "typeorm";
import { Location } from "../common/TravelHelper";
import BaseObject from "./abstract/BaseObject";
import { Place } from "./abstract/Place";
import { Garage } from "./places/Garage";
import { User } from "./User";

@Entity()
export class Car extends BaseObject {
  @Column()
  location: Location;

  @Column()
  assignedGarage: Garage;

  @Column({ nullable: true })
  place?: Place;

  @Column()
  avgSpeed: number;

  @Column()
  owner: User;

  constructor(name: string, assignedGarage: Garage, avgSpeed: number) {
    super(name);
    this.avgSpeed = avgSpeed;
    this.assignedGarage = assignedGarage;
  }
}
