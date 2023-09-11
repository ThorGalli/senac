import PromptSync from "prompt-sync";
import { Place } from "./Entities/abstract/Place";
import { Car } from "./Entities/Car";
import { Garage } from "./Entities/places/Garage";
import { Shop } from "./Entities/places/Shop";
import { User } from "./Entities/User";
import { cars, images, places } from "./fakedb";
const prompt = PromptSync();

// Initialize Game
const { user, city, favela, rural, beach, destinations } = setupGame();
let playing = false;
forceUserToBuyStarterCar();
runGameLoop();

// Functions
function setupGame() {
  const { city, favela, rural, beach } = places;
  const name = prompt("Olá? Qual é o seu nome? > ");
  const user = new User(name, city.carShop);
  const starterGarage = new Garage("Cafofo", { x: -6, y: 5 }, user, 1, images.favela1);
  user.AddGarage(starterGarage);
  city.carShop.AddSellable(cars);

  const destinations: Place[] = [
    city.carShop,
    city.gasStation,
    city.park,
    favela.gasStation,
    rural.farm,
    beach.gasStation,
    beach.center,
    starterGarage,
  ];

  return { user, city, favela, rural, beach, destinations };
}

function forceUserToBuyStarterCar() {
  console.log(`Aaah, sim, Sr(a). ${user.name}, nos falamos pelo telefone mais cedo!`);
  while (user.currentCar === undefined) {
    console.log(`Aqui estão as opções de carros que temos no momento:`);
    listShopItens(city.carShop);
    console.log("(Você tem: C$ ", user.cash.toFixed(2) + ")");
    const choice = +prompt(">");

    if (choice === 0) return; // Encerra o jogo

    const chosenItem = city.carShop.ChooseItem(choice);
    if (chosenItem === undefined) {
      // Recomeça While
      alert("Desculpe, não entendi");
    } else {
      // Prepara o jogo para começar
      const transaction = user.BuyItem(city.carShop, chosenItem);
      alert(transaction.msg);
      if (transaction.item instanceof Car) {
        user.currentCar = transaction.item;
        user.garages[0].cars.push(user.currentCar);
        user.currentCar.AssignGarage(user.garages[0]);
        playing = true;
      }
    }
  }
}

function runGameLoop() {
  while (playing) {
    console.log(user.GetInfo());

    console.table([
      "(Fechar Jogo)",
      "Olhar em volta",
      "Interagir",
      "Inspecionar Veículo",
      "Ir para outro lugar",
    ]);
    const choice = +prompt("O que deseja fazer? >");
    console.log("\n.\n.");
    switch (choice) {
      case 0:
        closeGame();
        break;
      case 1:
        lookAround();
        break;
      case 2:
        user.currentPlace.Interact(user);
        break;
      case 3:
        inspectCar();
        break;
      case 4:
        bringUpDestinations(destinations);
        break;
      default:
        alert("HEIN? NÃO ENTENDI");
    }
    prompt("\nPressione [enter] para continuar");
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
  }
}

function closeGame() {
  console.log("Encerrando jogo...\n");
  playing = false;
}

function lookAround() {
  console.log("Você percebe que está no(a) " + user.currentPlace.name);
  console.log("Olhando em volta é possivel notar... " + user.currentPlace.background.description);
}

function inspectCar() {
  if (user.currentCar) {
    console.log("Você está inpecionando o veículo...");
    console.log(user.currentCar.GetInfo());
  } else {
    console.log("Você está a pé...");
  }
}

function listShopItens(shop: Shop) {
  console.log("~~ Itens a venda e em estoque! ~~");
  shop.GetShopItems().forEach((item, index) => {
    console.log(`[${index + 1}] ${item.name} por C$ ${item.price.toFixed(2)}!`);
  });
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("Digite o código do item desejado ou [0] para sair");
}

function bringUpDestinations(places: Place[]) {
  console.log("Aqui está a lista de destinos!");
  console.table(
    places.map((p) => {
      return { nome: p.name };
    })
  );
  const choice = +prompt("Para onde você quer ir? >");
  if (choice >= 0 && choice < places.length) {
    travel(destinations[choice]);
  }
}

function travel(place: Place) {
  const { time, msg } = user.TravelTo(place);
  console.log(msg);
  if (time > 0 && user.currentCar) {
    prompt("\nPressione [enter] para começar a viagem.");
    user.currentCar.currentPlace = place;
    user.currentPlace = place;
    console.log("\nChegou instantaneamente!! QUE LOUCURA!");
    return;
  }
  console.log("Eita, peraí... Você já está nesse local...");
}

export function alert(msg: string) {
  console.log("\n*..." + msg + "...*\n");
}

// EndGame
console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nObrigado por jogar, grande há braço!");
