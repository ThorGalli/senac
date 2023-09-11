import { Location2D } from "../../common/utils";
import { Place } from "../abstract/Place";
import { Image } from "../Image";
import { User } from "../User";

export class Destination extends Place {
  private interactMsg: string;

  public Interact(user: User): void {
    console.log(this.interactMsg);
  }

  constructor(name: string, location: Location2D, background: Image, interactMsg: string) {
    super(name, location, background);
    this.interactMsg = interactMsg;
  }
}
