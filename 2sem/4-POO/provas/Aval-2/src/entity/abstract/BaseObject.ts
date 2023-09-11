import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default abstract class BaseObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  constructor(name: string) {
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}
