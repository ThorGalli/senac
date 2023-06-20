import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'
dotenv.config()

import { Usuario } from "../models/Usuario.js";
import { Log } from "../models/Log.js";

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body
  // evita de que a mensagem dê "pistas" para um possível invasor
  const mensaErroPadrao = "Erro... Login ou senha inválido"

  if (!email || !senha) {
//    res.status(400).json({ erro: "Informe e-mail e senha de acesso" })
    res.status(400).json({ erro: mensaErroPadrao})
    return
  }

  // verifica se o e-mail está cadastrado
  try {
    const usuario = await Usuario.findOne({ where: { email } })

    if (usuario == null) {
      // res.status(400).json({ erro: "Erro... E-mail inválido" })
      res.status(400).json({ erro: mensaErroPadrao})
      return
    }

    if (bcrypt.compareSync(senha, usuario.senha)) {
      const token = jwt.sign({
        user_logado_id: usuario.id,
        user_logado_nome: usuario.nome
      },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      )

      res.status(200).json({msg: "Ok. Logado", token})
    } else {

      // registra um log desta tentativa de acesso
      await Log.create({
        descricao: "Tentativa de Acesso com Senha Inválida",
        usuario_id: usuario.id
      })

      // res.status(400).json({ erro: "Erro... Senha inválida" })      
      res.status(400).json({ erro: mensaErroPadrao})
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

