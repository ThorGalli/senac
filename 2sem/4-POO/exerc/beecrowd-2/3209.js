const thorInput = require("fs").readFileSync("entrada", "utf8");
const lines = thorInput.split("\n");

const testCases = lines.shift();
for (let i = 0; i < testCases; i++) {
  const line = lines[i].split(" ");
  line.shift();
  const answer = line.reduce((previous, next) => +previous - 1 + +next);
  console.log(answer);
}
