import { v4 as uuidv4 } from "uuid";

let myuuid = uuidv4();

export default abstract class BasicObject {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(name: string) {
    this.name = name;
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}
