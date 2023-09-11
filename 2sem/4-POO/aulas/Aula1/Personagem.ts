export default class Personagem {
  // Atributos
  raca: string;
  classe: string;
  apelido: string;
  stamina: number;
  mana: number;
  forcaAtaque: number;
  intelecto: number;
  armadura: number;

  constructor(apelido: string) {
    this.raca = "";
    this.classe = "";
    this.apelido = apelido;
    this.stamina = 50;
    this.mana = 0;
    this.forcaAtaque = 0;
    this.intelecto = 0;
    this.armadura = 0;
  }
  // Métodos
}
