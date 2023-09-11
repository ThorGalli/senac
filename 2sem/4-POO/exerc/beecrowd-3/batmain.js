const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

const number = +lines.splice(0, 1);
for (let index = 0; index < number; index++) {
  console.log("Y");
}
