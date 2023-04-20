const prompt = require("prompt-sync")();

const nome = prompt("Nome: ");
const idade = Number(prompt("Idade: "));
const pretensao = Number(prompt("Pretensão salarial: "));

// if (idade >= 20 && idade <= 30 && pretensao >= 2000 && pretensao <= 3000) {
//   console.log(`${nome}, você foi selecionado!`);
// } else {
//   console.log(`${nome}, procure outra vaga...`);
// }

if (idade < 20 || idade > 30 || pretensao < 2000 || pretensao > 3000) {
  console.log(`${nome}, procure outra vaga...`);
} else {
  console.log(`${nome}, você foi selecionado!`);
}
