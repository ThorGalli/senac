const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

const cardapio = {
  suco: 120,
  morango: 85,
  mamao: 85,
  goiaba: 70,
  manga: 56,
  laranja: 50,
  brocolis: 34,
};

const min = 110;
const max = 130;
const vitCtotal = [];

while (lines[0].length == 1 && lines[0] != 0) {
  const alimentos = lines.splice(0, 1)[0];
  let vitC = 0;

  for (let i = 0; i < alimentos; i++) {
    const [amount, food] = lines.splice(0, 1)[0].split(" ");
    vitC += +amount * cardapio[food];
  }
  vitCtotal.push(vitC);
}

vitCtotal.forEach((vitC) => {
  if (vitC >= min && vitC <= max) {
    console.log(vitC + " mg");
  } else if (vitC < min) {
    console.log(`Mais ${min - vitC} mg`);
  } else {
    console.log(`Menos ${vitC - max} mg`);
  }
});
