const thorInput = require("fs").readFileSync("entrada", "utf8");
const lines = thorInput.split("\n");

const [able, required] = lines;

if (able.length < required.length) {
  console.log("no");
} else {
  console.log("go");
}
