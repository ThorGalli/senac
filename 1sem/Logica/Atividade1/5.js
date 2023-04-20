const prompt = require('prompt-sync')()

console.log("\n---Questão 4---\n")

const aluno = prompt("Aluno: ")
const nAlunos = Number(prompt("Nº Alunos da turma: "))
const nMsgs = Number(prompt("Nº Mensagens: "))
const poucoPopular = (nMsgs < nAlunos / 2)
let saida = ""

if (poucoPopular) {
    saida += `${aluno}, temos que melhorar a sua popularidade`
} else {
    saida += `Parabéns ${aluno}! Você é bem popular na turma`
}

console.log(saida)

console.log("\n------Fim------\n")