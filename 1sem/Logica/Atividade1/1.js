// CPF 07702399945 % 6 = 1
const prompt = require('prompt-sync')()

console.log("\n---Questão 1---\n")

const cidade = prompt("Cidade: ")
const nAvenidas = Number(prompt("Nº Avenidas: "))
const saida = `A cidade de ${cidade} possui ${nAvenidas} avenidas`

console.log(saida)

console.log("\n------Fim------\n")