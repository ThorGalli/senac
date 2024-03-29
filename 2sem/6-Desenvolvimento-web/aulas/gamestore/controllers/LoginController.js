import dbKnex from "../dados/db_config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

export const loginAdmin = async (req, res) => {
  // faz a desestruturação do objeto req.body
  const { email, senha } = req.body;

  // validação para os campos
  if (!email || !senha) {
    //      res.status(400).json({ erro: "Enviar email, senha do usuário" });
    res.status(400).json({ erro: "Login ou senha incorretos" });
    return;
  }

  // verifica se o e-mail já está cadastrado
  try {
    const dados = await dbKnex("admins").where({ email });
    if (dados.length == 0) {
      //        res.status(400).json({ erro: "E-mail inválido" });
      res.status(400).json({ erro: "Login ou senha incorretos" });
      return;
    }

    // compara a senha informada com a senha do cadastro (criptografados)
    if (bcrypt.compareSync(senha, dados[0].senha)) {
      const token = jwt.sign(
        {
          admin_id: dados[0].id,
          admin_nome: dados[0].nome,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ msg: "Ok! Acesso Liberado", token });
    } else {
      //res.status(400).json({ erro: "Senha Incorreta" });
      res.status(400).json({ erro: "Login ou senha incorretos" });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const loginPlayer = async (req, res) => {
  // faz a desestruturação do objeto req.body
  const { email, senha } = req.body;

  // validação para os campos
  if (!email || !senha) {
    //      res.status(400).json({ erro: "Enviar email, senha do usuário" });
    res.status(400).json({ erro: "Login ou senha incorretos" });
    return;
  }

  // verifica se o e-mail já está cadastrado
  try {
    const dados = await dbKnex("players").where({ email });
    if (dados.length == 0) {
      //        res.status(400).json({ erro: "E-mail inválido" });
      res.status(400).json({ erro: "Login ou senha incorretos" });
      return;
    }

    // compara a senha informada com a senha do cadastro (criptografados)
    if (bcrypt.compareSync(senha, dados[0].senha)) {
      const token = jwt.sign(
        {
          player_id: dados[0].id,
          player_name: dados[0].nome,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ msg: "Ok! Acesso Liberado", token });
    } else {
      //res.status(400).json({ erro: "Senha Incorreta" });
      res.status(400).json({ erro: "Login ou senha incorretos" });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};
