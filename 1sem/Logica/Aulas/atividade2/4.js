const prompt = require("prompt-sync")();

let nfiliais = Number(prompt("Nº de filiais em 2022: "));
const projecao = Number(prompt("Projeção até: "));
console.log("");
console.log(`Nº de Filiais Previstas Até ${projecao}`);
console.log("-".repeat(30));

for (let ano = 2023; ano <= projecao; ano++) {
    nfiliais *= 2;
    console.log(`${ano}: ${nfiliais} filiais`);
}