import { alert } from "../../app";
import { Location2D } from "../../common/utils";
import { Place } from "../abstract/Place";
import { Sellable } from "../abstract/Sellable";
import { Image } from "../Image";
import { User } from "../User";

export class Shop extends Place {
  inventory: Sellable[] = [];

  constructor(name: string, location: Location2D, background: Image) {
    super(name, location, background);
  }

  public AddSellable(item: Sellable[]) {
    item.forEach((i) => this.inventory.push(i));
  }

  public GetShopItems() {
    return this.inventory;
  }

  public ChooseItem(choice: number) {
    if (choice <= 0 || choice > this.inventory.length) return undefined;
    return this.inventory[choice - 1];
  }

  public Interact(user: User): void {
    if (this.inventory.length == 0) {
      console.log("~~ Estamos sem estoque no momento! ~~");
      return;
    }

    while (true) {
      console.log("~~ Itens a venda e em estoque! ~~");
      this.inventory.forEach((item, index) => {
        console.log(`[${index + 1}] ${item.name} por C$ ${item.price.toFixed(2)}!`);
      });
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("Digite o código do item desejado ou [0] para sair");

      const choice = +this.prompt(">");

      if (choice === 0) {
        console.log("Até mais!");
        break;
      }

      const chosenItem = this.ChooseItem(choice);
      if (chosenItem === undefined) {
        alert("Desculpe, não entendi");
      } else {
        const transaction = user.BuyItem(this, chosenItem);
        alert(transaction.msg);
        break;
      }
    }
  }
}
