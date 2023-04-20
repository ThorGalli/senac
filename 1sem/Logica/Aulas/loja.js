const prompt = require("prompt-sync")()

const produto = prompt("Produto: ")
const preco = Number(prompt("Preço R$: "))



if (preco < 100) {
    console.log("Somente à vista")
} else {
    const parcela = preco / 3
    console.log(`Pode pagar em 3x de R$: ${parcela.toFixed(2)}`)
}