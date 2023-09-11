import { Location2D } from "../../common/utils";
import { Place } from "../abstract/Place";
import { Car } from "../Car";
import { Image } from "../Image";
import { User } from "../User";

export class Garage extends Place {
  owner: User;
  cars: Car[] = [];
  capacity: number;

  constructor(name: string, location: Location2D, user: User, capacity: number, background: Image) {
    super(name, location, background);
    this.owner = user;
    this.capacity = capacity;
  }

  public Interact(user: User): void {
    if (this.cars.length == 0) {
      console.log("A garagem está vazia...");
    }
    console.log("Nessa garagem, você tem:");
    this.cars.forEach((car, i) => console.log(`[${i + 1}] ${car.name}`));
  }
}
