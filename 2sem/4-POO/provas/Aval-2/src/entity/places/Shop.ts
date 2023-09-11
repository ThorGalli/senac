import { Column, Entity } from "typeorm";
import { Location } from "../../common/TravelHelper";

import { Place } from "../abstract/Place";
import { Inventory } from "../Inventory";

@Entity()
export class Shop extends Place {
  @Column()
  inventory: Inventory;

  constructor(name: string, location: Location) {
    super(name, location);
  }
}
