import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv'
dotenv.config()

export const verificaLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    console.log(decode)
    req.admin_id = decode.admin_id
    req.admin_nome = decode.admin_nome
    next();
  } catch (error) {
    return res.status(401).send({ erro: "Falha na autenticação" })
  }
}