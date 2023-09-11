const input = require("fs").readFileSync("entrada", "utf8");
const lines = input.split("\n");

const [hours, avgSpeed] = lines;
const answer = (Number(hours) * Number(avgSpeed)) / 12;
console.log(answer.toFixed(3));
