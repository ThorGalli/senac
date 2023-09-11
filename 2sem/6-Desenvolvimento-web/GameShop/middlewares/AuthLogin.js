import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

export const authLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user_id = decode.user_id;
    req.user_name = decode.user_name;
    if (decode.user_access >= 1) {
      next();
    } else {
      return res.status(401).send({ erro: "Área restrita" });
    }
  } catch (error) {
    return res.status(401).send({ erro: "Falha na autenticação" });
  }
};
