// Um posto está vendendo combustíveis com a seguinte tabela de descontos:
//
// Etanol:     Até 30 litros, desconto de 4% por litro
//             Acima de 30 litros, desconto de 6% por litro
//
// Gasolina:   Até 25 litros, desconto de 5% por litro
//             Acima de 25 litros, desconto de 8% por litro
//
// Escreva um algoritmo que leia o número de litros vendidos eo tipo de combustível
// (codificado da seguinte forma: A - álcool, G - gasolina),
// Calcule e imprima o valor a ser pago pelo cliente
// sabendo-se que o preço do litro da gasolina é R$ 7,00
// e o preço do litro do Etanol é R$ 5,00.

const prompt = require("prompt-sync")();
const etanolPrice = 5;
const gasPrice = 7;

let fuelType = "";
let fuelPrice = 0;
let liters = 0;
let total = 0;
let discount = 0;

console.log("~ ".repeat(40) + "\n");
console.log(".____________________________________________________________.");
console.log("|           ~ ~ Bem vindo ao posto caçulinha! ~ ~            |");
console.log("|------------------------------------------------------------|");
console.log("| [A] Etanol:   Até 30 litros, desconto de 4% por litro      |");
console.log("| [R$ 5,00/l]   Acima de 30 litros, desconto de 6% por litro |");
console.log("|------------------------------------------------------------|");
console.log("| [G] Gasolina: Até 25 litros, desconto de 5% por litro      |");
console.log("| [R$ 7,00/l]   Acima de 25 litros, desconto de 8% por litro |");
console.log("|____________________________________________________________|");

while (true) {
  console.log("\nQuantos litros de combustível você deseja abastecer?");
  liters = Number(prompt(">"));
  if (!isNaN(liters) && liters > 0) {
    break;
  } else {
    console.log("\nErro: o valor indicado é inválido, o valor deve ser um número maior que 0.");
  }
}
console.log("\nCerto! E qual seria o tipo de cobustível?");

while (true) {
  console.log("Indique 'A' para Álcool ou 'G' para Gasolina.");
  fuelType = prompt(">").toUpperCase();
  if (fuelType == "G" || fuelType == "A") {
    break;
  } else {
    console.log(
      "\nErro: o valor indicado é inválido, indique apenas a letra correspondete ao combustível desejado.\n"
    );
  }
}

console.log("Okay! Deixa eu calcular o preço pra você! Vamos ver se você pegou o desconto! \n");

if (fuelType == "A") {
  fuelPrice = etanolPrice;
  if (liters <= 30) {
    discount = 4;
  } else if (liters > 30) {
    discount = 6;
  }
}

if (fuelType == "G") {
  fuelPrice = gasPrice;
  if (liters <= 25) {
    discount = 5;
  } else if (liters > 25) {
    discount = 8;
  }
}

const discountMultiplier = (100 - discount) / 100;

total = fuelPrice * liters * discountMultiplier;

console.log(".\n.\n.\nProntinho!");
if (discount > 0) {
  console.log(`Você conseguiu um descontinho de ${discount}% :)`);
}
console.log(`Ficou um total de R$ ${total.toFixed(2)}`);
console.log("Obrigado pela preferência! Volte sempre!");
console.log("~ ".repeat(40) + "\n");
