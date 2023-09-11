const thorInput = require("fs").readFileSync("entrada", "utf8");
const lines = thorInput.split("\n");

const [distance, fuelSpent] = lines;
const consumption = +distance / +fuelSpent;
console.log(consumption.toFixed(3) + " km/l");
