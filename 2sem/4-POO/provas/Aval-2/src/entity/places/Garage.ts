import { Column, Entity } from "typeorm";
import { Location } from "../../common/TravelHelper";

import { Place } from "../abstract/Place";
import { Car } from "../Car";
import { User } from "../User";

@Entity()
export class Garage extends Place {
  @Column()
  owner: User;

  @Column()
  cars: Car[];

  @Column()
  capacity: number;

  constructor(name: string, location: Location) {
    super(name, location);
  }
}
