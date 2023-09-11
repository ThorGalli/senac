import { Column, Entity } from "typeorm";
import BaseObject from "./abstract/BaseObject";
import Wrappable from "./abstract/Wrappable";
import { Inventory } from "./Inventory";

@Entity()
export class WrappedItem extends BaseObject {
  @Column()
  content: Wrappable;

  @Column()
  parentInventory: Inventory;

  constructor(content: Wrappable) {
    super("[Wrapped] " + content.name);
    this.content = content;
  }

  protected onUse() {
    this.content.use();
  }
}
