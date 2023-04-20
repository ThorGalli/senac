const prompt = require('prompt-sync')()

console.log("\n---Questão 2---\n")

const nOvos = Number(prompt("Nº de Ovos: "))
const nCaixas = (nOvos - nOvos % 12) / 12
let message = "caixas de ovos"

if (nCaixas == 1 || nCaixas == 0) {
    message = "caixa de ovo"
}

const saida = `Pode-se preencher ${nCaixas} ${message}`

console.log(saida)

console.log("\n------Fim------\n")