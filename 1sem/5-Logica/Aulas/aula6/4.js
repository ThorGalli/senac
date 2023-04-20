const prompt = require('prompt-sync')()

const candidato = prompt("Candidato: ")
const nAcertos = Number(prompt("Nº Acertos: "));

let message = candidato + ", "

if (nAcertos < 20) {
    message += "você está reprovado."
} else if (nAcertos <= 30) {
    message += "você deve realizar um teste complementar."
} else {
    message += "você está aprovado para a 2ª fase."
}

console.log(message)
console.log("\n\n-----------------------------------------------------\n");