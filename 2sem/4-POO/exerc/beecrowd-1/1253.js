const input = require("fs").readFileSync("entrada", "utf8");
const lines = input.split("\n");

const n = +lines[0];
const encrypted = [];
const decrypted = [];
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

for (let i = 0; i < n; i++) {
  encrypted.push({ word: lines[1 + i * 2], shiftAmount: +lines[2 + i * 2] });
}

encrypted.forEach((encryptedWord) => {
  const reversedAlphabet = [...alphabet].reverse();
  const splicedAlphabet = reversedAlphabet.splice(0, encryptedWord.shiftAmount);

  const shiftedAlphabet = reversedAlphabet.concat(splicedAlphabet).reverse();

  let newWord = "";

  for (let char = 0; char < encryptedWord.word.length; char++) {
    newWord += shiftedAlphabet[alphabet.indexOf(encryptedWord.word.charAt(char))];
  }

  decrypted.push(newWord);
});

decrypted.forEach((decryptedWord) => console.log(decryptedWord));
