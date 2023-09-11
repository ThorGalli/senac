import { Car } from "./Entities/Car";
import { Image } from "./Entities/Image";
import { Destination } from "./Entities/places/Destination";
import { GasStation } from "./Entities/places/GasStation";
import { Shop } from "./Entities/places/Shop";

export const images = {
  avenida: new Image(
    "Avenida 1",
    "Uma bela avenida cheia de plátanos.",
    "localhost:42069/avenida1.png"
  ),
  park: new Image("Parquinho", "Um parquinho da hora.", "localhost:42069/park.png"),
  favela1: new Image("Favela 1", "Uma favela caindo aos pedaços.", "localhost:42069/favela1.png"),
  favela2: new Image("Favela 2", "Uma favela arrumadinha.", "localhost:42069/favela2.png"),
  rural: new Image(
    "Rural 1",
    "A área rural da cidade, com campos vastos e sol quente.",
    "localhost:42069/rural1.png"
  ),
  beach: new Image(
    "Praia 1",
    "A praia do Abacaxi. Cheia de turistas nessa época do ano!",
    "localhost:42069/beach.png"
  ),
};

export const places = {
  city: {
    carShop: new Shop("Avenida Carros", { x: 0, y: 1 }, images.avenida),
    gasStation: new GasStation("Posto do Glads", { x: 0, y: 2 }, images.avenida),
    park: new Destination(
      "Parquinho da Sorte",
      { x: 0, y: 0 },
      images.park,
      "Você faz carinho em um cachorro do parque e se sente mais feliz."
    ),
  },
  favela: {
    gasStation: new GasStation("Posto do Flavinho", { x: -5, y: 5 }, images.favela2),
  },
  rural: {
    gasStation: new GasStation("Posto do Alemão", { x: 5, y: 0 }, images.rural),
    farm: new Destination(
      "Fazendo do seu Alfeu",
      { x: 7, y: 0 },
      images.rural,
      "Você senta na sombra sob uma Bergamoteira e come uma bergamota tranquilamente."
    ),
  },
  beach: {
    gasStation: new GasStation("Posto do Gugu", { x: 0, y: -5 }, images.beach),
    center: new Destination(
      "Praia do Abacaxi",
      { x: 0, y: -6 },
      images.beach,
      "Você vai até a beira da praia e molha os pés... A água fria lhe refresca."
    ),
  },
};

export const cars = [
  new Car("Logan", 140, 10_000, places.city.carShop),
  new Car("Saveiro", 100, 5_000, places.city.carShop),
  new Car("Clio", 80, 2_500, places.city.carShop),
  new Car("Ká", 60, 1_000, places.city.carShop),
  new Car("Fusca Azul", 40, 200, places.city.carShop),
];
