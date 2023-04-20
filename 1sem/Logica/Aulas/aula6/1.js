const prompt = require('prompt-sync')()

const entrada = Number(prompt("Hora no Brasil: "))
let saida = entrada + 5

if (entrada >= 19) {
    saida -= 24
}

console.log("Hora na França: " + saida);
