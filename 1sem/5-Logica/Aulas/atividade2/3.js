const prompt = require("prompt-sync")();

const lado = Number(prompt("Número: "));
const simbolo = prompt("Símbolo: ") + " ";

const linha = simbolo.repeat(lado);
const quadrado = (linha + "\n").repeat(lado);

console.log(quadrado);