const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

const mae = +lines.splice(0, 1);
const filho1 = +lines.splice(0, 1);
const filho2 = +lines.splice(0, 1);
const filho3 = mae - filho1 - filho2;
let maisvelho = 0;

if (filho1 >= maisvelho) {
  maisvelho = filho1;
}
if (filho2 >= maisvelho) {
  maisvelho = filho2;
}
if (filho3 >= maisvelho) {
  maisvelho = filho3;
}
console.log(maisvelho);
