// C
// Ó
// D
// I
// G
// O

const prompt = require("prompt-sync")();

const nome = prompt("Nome: ");
const anoNascimento = Number(prompt("Ano de nascimento: "));
const anoTrabalho = Number(prompt("Ano que começou a  trabalhar: "));

const idade = 2022 - anoNascimento;
const tempoDeServico = 2022 - anoTrabalho;

console.log("Idade:", idade);
console.log("Tempo de Serviço:", tempoDeServico);

const podeRequerer = idade >= 60 || tempoDeServico >= 25 || (idade >= 55 && tempoDeServico >= 20);

if (podeRequerer) {
  console.log(`${nome}, você pode requerer aposentadoria.`);
} else {
  console.log(`${nome}, você não pode requerer aposentadoria.`);
}
