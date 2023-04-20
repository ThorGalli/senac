const prompt = require('prompt-sync')()

console.log("\n---Questão 3---\n")

const nome = prompt("Nome: ")
const totalmeses = Number(prompt("Nº meses: "))

const nMeses = totalmeses % 12
const nAnos = (totalmeses - nMeses) / 12

let anos = "anos"
let meses = "meses"

if (nAnos == 0 || nAnos == 1) {
    anos = "ano"
}

if (nMeses == 0 || nMeses == 1) {
    meses = "mês"
}

const saida = `${nome} possui ${nAnos} ${anos} e ${nMeses} ${meses}`

console.log(saida)

console.log("\n------Fim------\n")