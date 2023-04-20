const prompt = require('prompt-sync')()

console.log("\n---Questão 4---\n")

const jogador = prompt("Jogador: ")
const nGols = Number(prompt("Nº de Gols: "))

let saida = jogador + ", "

if (nGols == 0) {
    saida += "você não marcou gol"
} else if (nGols == 1) {
    saida += "você fez apenas 1 gol"
} else {
    saida += `você fez ${nGols} gols, parabéns!`
}

console.log(saida)

console.log("\n------Fim------\n")