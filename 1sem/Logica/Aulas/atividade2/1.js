const prompt = require("prompt-sync")();

const numero = Number(prompt("Número: "));
let contagem = "Contagem: ";

for (let progressiva = 1; progressiva < numero; progressiva++) {
    contagem += progressiva;
    contagem += ", ";
}

for (let regressiva = numero; regressiva > 1; regressiva--) {
    contagem += regressiva;
    contagem += ", ";
}

contagem += "1";

console.log(contagem);