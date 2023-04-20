// C
// Ó
// D
// I
// G
// O

const prompt = require("prompt-sync")();

const primeiro = Number(prompt("1º Número: "));
const segundo = Number(prompt("2º Número: "));
const terceiro = Number(prompt("3º Número: "));
let soma = 0;

if (primeiro >= segundo || primeiro >= terceiro) {
  soma += primeiro;
}
if (terceiro >= segundo || terceiro >= primeiro) {
  soma += terceiro;
}
if (segundo >= terceiro || segundo >= primeiro) {
  soma += segundo;
}
if (primeiro == segundo && primeiro == terceiro) {
  soma = primeiro + segundo;
}

console.log("Soma dos 2 maiores é:", soma);
