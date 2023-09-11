import { Column, Entity } from "typeorm";
import BaseObject from "./abstract/BaseObject";

@Entity()
export class Image extends BaseObject {
  @Column()
  description: string;

  @Column()
  filename: string;
}
