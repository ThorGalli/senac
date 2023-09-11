import dbKnex from "../data/db_config.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const clienteIndex = async (req, res) => {
  try {
    // obtém da tabela de clientes todos os registros (em ordem de nome)
    const clientes = await dbKnex.select("*").from("clientes").orderBy("nome");
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const clienteStore = async (req, res) => {
  // atribui via desestruturação
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, email e senha do cliente" });
    return;
  }

  if (senha.length < 8) {
    res.status(400).json({ id: 0, msg: "Erro... senha deve possuir, no mínimo, 8 caracteres" });
    return;
  }

  let pequenas = 0;
  let grandes = 0;
  let numeros = 0;
  let simbolos = 0;

  for (const letra of senha) {
    if (/[a-z]/.test(letra)) {
      pequenas++;
    } else if (/[A-Z]/.test(letra)) {
      grandes++;
    } else if (/[0-9]/.test(letra)) {
      numeros++;
    } else {
      simbolos++;
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    res
      .status(400)
      .json({
        id: 0,
        msg: "Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos",
      });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  // console.log(salt)

  const hash = bcrypt.hashSync(senha, salt);
  // console.log(hash)

  try {
    const novo = await dbKnex("clientes").insert({ nome, email, senha: hash });

    // novo[0] => retorna o id do registro inserido
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const carroUpdate = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const { modelo, marca, ano, preco } = req.body;

  if (!modelo || !marca || !ano || !preco) {
    res.status(400).json({
      id: 0,
      msg: "Erro... informe modelo, marca, ano e preco do veículo",
    });
    return;
  }

  try {
    await dbKnex("carros").where({ id }).update({ modelo, marca, ano, preco });

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const carroDelete = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  try {
    await dbKnex("carros").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const carroPesq = async (req, res) => {
  const { marca } = req.params;

  try {
    // obtém da tabela de carros todos os registros da marca indicada
    const carros = await dbKnex("carros").whereLike("marca", marca);
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const carroIntervalo = async (req, res) => {
  const { from, to } = req.params;

  try {
    // obtém da tabela de carros todos os registros do intervalo de anos indicado
    // em ordem de ano
    const carros = await dbKnex("carros").whereBetween("ano", [from, to]).orderBy("ano");
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const carroModelo = async (req, res) => {
  const { modelo } = req.params;

  try {
    // obtém da tabela de carros todos os registros da modelo indicado
    const carros = await dbKnex("carros").whereLike("modelo", `%${modelo}%`);
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
