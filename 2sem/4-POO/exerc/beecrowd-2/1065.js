const thorInput = require("fs").readFileSync("entrada", "utf8");
const lines = thorInput.split("\n");

const even = lines.filter((value) => +value.length != 0 && +value % 2 === 0).length;
console.log(even + " valores pares");
