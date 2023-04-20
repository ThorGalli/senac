const prompt = require('prompt-sync')()
const num = Number(prompt("Número: "))
let proximo

if (num % 2 == 0) {
    proximo = num + 2
} else {
    proximo = num + 1
}

console.log(`Próximo par: ${proximo}`)