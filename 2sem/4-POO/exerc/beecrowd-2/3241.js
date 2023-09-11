const thorInput = require("fs").readFileSync("entrada", "utf8");
const lines = thorInput.split("\n");

const n = lines.shift();

for (let i = 0; i < n; i++) {
  if (lines[i] == "P=NP") {
    console.log("skipped");
  } else {
    const [a, b] = lines[i].split("+");
    console.log(+a + +b);
  }
}
