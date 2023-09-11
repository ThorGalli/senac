import dbKnex from "../dados/db_config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

export const loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ erro: "Credenciais inválidas." });
    return;
  }

  try {
    const dados = await dbKnex("admins").where({ email });
    if (dados.length == 0) {
      res.status(400).json({ erro: "Credenciais inválidas." });
      return;
    }

    if (bcrypt.compareSync(senha, dados[0].senha)) {
      const token = jwt.sign(
        {
          user_id: dados[0].id,
          user_name: dados[0].nome,
          user_access: 1,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ msg: "Login realizado com sucesso.", token });
    } else {
      res.status(400).json({ erro: "Credenciais inválidas." });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ erro: "Credenciais inválidas." });
    return;
  }
  try {
    const dados = await dbKnex("user").where({ email, status: "verified" });
    if (dados.length == 0) {
      res.status(400).json({ erro: "Credenciais inválidas." });
      return;
    }
    if (bcrypt.compareSync(senha, dados[0].senha)) {
      const token = jwt.sign(
        {
          user_id: dados[0].id,
          user_name: dados[0].nome,
          user_access: dados[0].access,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ msg: "Login realizado com sucesso.", token });
    } else {
      res.status(400).json({ erro: "Credenciais inválidas." });
    }
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};
