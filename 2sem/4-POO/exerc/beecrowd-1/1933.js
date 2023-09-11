const input = require("fs").readFileSync("entrada", "utf8");
const lines = input.split("\n");

const [a, b] = lines[0].split(" ");

let answer = "";

if (Number(a) >= Number(b)) {
  answer = a;
} else {
  answer = b;
}

console.log(answer);
