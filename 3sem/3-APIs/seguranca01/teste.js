import bcrypt from "bcrypt";

const t0 = Date.now();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
await sleep(1000);

const senha = "sabonete";
const salt = bcrypt.genSaltSync(10);
const hash = await bcrypt.hash(senha, salt);

console.log();
console.log("Senha:", senha);
console.log(" Salt:", salt);
console.log(" Hash:", hash);
console.log();

console.log((Date.now() - t0) / 1000, "seconds");
