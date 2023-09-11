import { Entity, Column } from "typeorm";
import { Location } from "../../common/TravelHelper";
import { Image } from "../Image";
import BaseObject from "./BaseObject";

@Entity()
export abstract class Place extends BaseObject {
  @Column()
  location: Location;

  @Column()
  backGround: Image;

  constructor(name: string, location: Location) {
    super(name);
    this.location = location;
  }
}
