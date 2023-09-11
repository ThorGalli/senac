const input = require("fs").readFileSync("entrada", "utf8");
const lines = input.split("\n");

const games = [];

lines.forEach((line) => {
  const values = line.split(" ");
  games.push({ A: values[0], B: values[1], C: values[2], winner: "" });
});

games.forEach((player) => {
  if (player.A === player.B && player.B === player.C) {
    player.winner = "*";
  } else if (player.A != player.B && player.B === player.C) {
    player.winner = "A";
  } else if (player.A != player.B && player.A === player.C) {
    player.winner = "B";
  } else {
    player.winner = "C";
  }
  console.log(player.winner);
});
