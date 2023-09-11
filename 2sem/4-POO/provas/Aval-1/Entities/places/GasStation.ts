import { Location2D } from "../../common/utils";
import { Place } from "../abstract/Place";
import { Image } from "../Image";
import { User } from "../User";

export class GasStation extends Place {
  constructor(name: string, location: Location2D, background: Image) {
    super(name, location, background);
  }

  public Interact(user: User): void {
    console.log(
      "Você tenta abastecer seu carro, mas esqueceu o seu " +
        user.currentCar?.name +
        " roda na força do ódio."
    );
  }
}
