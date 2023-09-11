const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

for (let index = 0; index < lines.length; index++) {
  const [hug, ze, lu] = lines[index].split(" ");

  let meio = "*";

  if ((hug > lu && hug < ze) || (hug < lu && hug > ze)) {
    meio = "huguinho";
  } else if ((ze > lu && ze < hug) || (ze < lu && ze > hug)) {
    meio = "zezinho";
  } else if ((lu > ze && lu < hug) || (lu < ze && lu > hug)) {
    meio = "luisinho";
  }

  console.log(meio);
}
