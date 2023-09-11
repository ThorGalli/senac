import dbKnex from "../data/db_config.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const clienteIndex = async (req, res) => {
  try {
    // obtém da tabela de carros todos os registros
    const clientes = await dbKnex.select("*").from("clientes").orderBy("nome");
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const clienteStore = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, email e senha para registrar." });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hash(senha, salt);

  try {
    const registro = await dbKnex("clientes").insert({ nome, email, senha: hash });
    res.status(201).json({ id: registro[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, email e senha para registrar." });
  }
};
