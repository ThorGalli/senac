import { Column, Entity } from "typeorm";
import { Image } from "../Image";
import BaseObject from "./BaseObject";

@Entity()
export default class Wrappable extends BaseObject {
  @Column()
  basePrice: number;

  @Column()
  icon: Image;

  constructor(name: string, basePrice: number, icon: Image) {
    super(name);
    this.basePrice = basePrice;
    this.icon = icon;
  }

  public use() {
    console.log("USOU");
  }
}
