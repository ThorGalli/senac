import { Entity, Column } from "typeorm";
import BaseObject from "./abstract/BaseObject";
import { WrappedItem } from "./WrappedItem";
import { User } from "./User";
import { Shop } from "./places/Shop";

@Entity()
export class Inventory extends BaseObject {
  @Column()
  owner: User | Shop;

  @Column()
  items: WrappedItem[];

  @Column()
  capacity: number;

  constructor(name: string) {
    super(name);
  }
}
