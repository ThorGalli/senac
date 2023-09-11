const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

const number = lines[0];
if (number.includes("13")) {
  console.log(`${number} es de Mala Suerte`);
} else {
  console.log(`${number} NO es de Mala Suerte`);
}
