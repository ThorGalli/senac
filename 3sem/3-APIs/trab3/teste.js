import bcrypt from 'bcrypt'

const senha = "avenida1234"

console.time("tempo")
const salt = bcrypt.genSaltSync(12)
const hash = bcrypt.hashSync(senha, salt)
console.timeEnd("tempo")

const verifica = await bcrypt.compare("avenida1234", hash)

const msg = verifica ? "Ok! Senha correta" : "Erro... Incorreto"

console.log(msg)

console.log(senha)
console.log(salt)
console.log(hash)