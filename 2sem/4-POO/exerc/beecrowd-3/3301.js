const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

const entrada = +lines[1];

switch (entrada) {
  case 5:
    console.log("luisinho");
    break;
  case 6:
    console.log("zezinho");
    break;
  case 7:
    console.log("huguinho");
    break;
  default:
    break;
}
