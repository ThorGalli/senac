const entrada = +lines[0];

let menina = 0;
let menino = 0;

for (let i = 1; i <= entrada; i++) {
  let crianca = lines[i];
  let sexo = crianca.split(" ")[1];

  if (sexo == "F") {
    menina++;
  } else {
    menino++;
  }
}
console.log(`${menino} carrinhos`);
console.log(`${menina} bonecas`);
