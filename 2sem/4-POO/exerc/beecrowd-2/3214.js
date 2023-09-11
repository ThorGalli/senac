const thorInput = require("fs").readFileSync("entrada", "utf8");
const lines = thorInput.split("\n");

const [old, found, price] = lines[0].split(" ");

let bottles = +old + +found;
let bought = 0;

while (bottles >= +price) {
  bought++;
  bottles++;
  bottles -= +price;
}

console.log(bought);
