const input = require("fs").readFileSync("entrada", "utf8");
const lines = input.split("\n");

const elfAmount = lines.shift();
let answer = 0;

//cria um array com 4 objetos, com os atributos: label do grupo
//e o custo em horas pra produzir 1 presente daquele grupo
const groups = [
  { label: "bonecos", cost: 8, amount: 0 },
  { label: "arquitetos", cost: 4, amount: 0 },
  { label: "musicos", cost: 6, amount: 0 },
  { label: "desenhistas", cost: 12, amount: 0 },
];

//percorre todos os elfos
for (let i = 0; i < elfAmount; i++) {
  //o name aqui não vai ser usado mesmo.
  const [name, groupLabel, hours] = lines[i].split(" ");

  //adiciona as horas pro grupo que o elfo faz parte
  groups.forEach((group) => {
    if (group.label === groupLabel) {
      group.amount += +hours;
    }
  });
}

//calcula quantos presentes foram completos
groups.forEach((group) => {
  answer += Math.floor(group.amount / group.cost);
});

//resposta
console.log(answer);
