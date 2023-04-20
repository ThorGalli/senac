const prompt = require('prompt-sync')()
const nome = prompt("Nome: ")
const sexo = prompt("Sexo [M/F]: ")
const altura = Number(prompt("Altura (em metros): "))

let peso
let message = nome + ", seu peso ideal é: "
if (sexo == "m" || sexo == "M") {
    peso = 72.7 * altura - 58
} else if (sexo == "f" || sexo == "F") {
    peso = 62.1 * altura - 44.7
} else {
    message = "Sexo Inválido"
    peso = '!'
}

console.log(message + peso);
