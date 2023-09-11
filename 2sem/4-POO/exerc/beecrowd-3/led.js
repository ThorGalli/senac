const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

const numbers = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

const cases = +lines.splice(0, 1);
const answers = [];

lines.forEach((line) => {
  if (line.length == 0) return;
  let leds = 0;
  for (let i = 0; i < line.length; i++) {
    leds += numbers[+line.charAt(i)];
  }
  answers.push(leds + " leds");
});
answers.forEach((answer) => console.log(answer));
