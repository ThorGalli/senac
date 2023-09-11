"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Personagem {
    constructor(apelido) {
        this.raca = "";
        this.classe = "";
        this.apelido = apelido;
        this.stamina = 50;
        this.mana = 0;
        this.forcaAtaque = 0;
        this.intelecto = 0;
        this.armadura = 0;
    }
}
exports.default = Personagem;
class Log {
    constructor() {
        this.big = (msg) => {
            console.log("========== " + msg + " ==========");
        };
        this.simple = (msg) => {
            console.log(msg);
        };
    }
}
const log = new Log();
log.big("Running");
const thor = new Personagem("Thor");
thor.armadura = 35;
thor.classe = "Mago";
thor.mana = 200;
thor.forcaAtaque = 12;
thor.intelecto = 90;
thor.raca = "Humano";
thor.stamina = 75;
console.log(thor);
log.big("Done");
