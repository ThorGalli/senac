const input = require("fs").readFileSync("entrada", "utf8");
const lines = input.split("\n");

const [name, salary, sales] = lines;
const answer = Number(salary) + Number(sales) * 0.15;
console.log("TOTAL = R$ " + answer.toFixed(2));
