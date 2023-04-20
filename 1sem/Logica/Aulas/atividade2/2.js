const prompt = require("prompt-sync")();

console.log("Campanha de Vacinação");
console.log("-".repeat(30));

let totalCriancas = 0;
let totalGotas = 0;

while (true) {
    const crianca = prompt("Criança: ");
    const nGotas = Number(prompt("Nº de Gotas: "));

    totalCriancas++;
    totalGotas += nGotas;

    console.log(`${crianca} vacinado(a) com ${nGotas} gotas`);
    const exit = prompt("Continuar? (S/N): ").toLowerCase() == "n";
    console.log("");

    if(exit){
        break;
    }
}

const totalFrascos = Math.ceil(totalGotas/30);

console.log("-".repeat(30));
console.log("Crianças vacinadas: ", totalCriancas);
console.log("Total de Gotas: ", totalGotas);
console.log("Nº de frascos abertos: ", totalFrascos);
