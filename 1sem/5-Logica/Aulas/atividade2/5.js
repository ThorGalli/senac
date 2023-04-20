const prompt = require("prompt-sync")();

const competidores = []
console.log("Informe os competidores ou 'Fim' para sair");
console.log("-".repeat(40));

while (true){
    const nCompetidor = competidores.length + 1;
    const entrada = prompt(`${nCompetidor}º Competidor: `);

    if (entrada.toUpperCase() == "FIM"){
        break;
    } else {
        competidores.push(entrada);
    }
}

console.log("")
console.log("Lista dos competidores:")
console.log("-".repeat(20));

const invertido = competidores.reverse();

invertido.forEach( element => console.log(element));