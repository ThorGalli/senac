const prompt = require('prompt-sync')()

const valorConta = Number(prompt("Valor da Conta R$: "))
const valorPago = Number(prompt("Valor Pago R$: "))

let diferenca = valorPago - valorConta

if (diferenca > 0) {
    console.log("Troco R$: " + diferenca.toFixed(2));
} else if (diferenca == 0) {
    console.log("Obrigado, volte sempre!");
} else {
    diferenca = -diferenca
    console.log("Ops... Faltou R$ " + diferenca.toFixed(2))
}