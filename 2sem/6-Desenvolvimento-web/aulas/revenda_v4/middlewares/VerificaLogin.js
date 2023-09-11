import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv'
dotenv.config()

export const verificaLoginCliente = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    console.log(decode);
    req.cliente_id = decode.cliente_id
    next();
  } catch (error) {
    return res.status(401).send({ erro: "Falha na autenticação" })
  }
}
