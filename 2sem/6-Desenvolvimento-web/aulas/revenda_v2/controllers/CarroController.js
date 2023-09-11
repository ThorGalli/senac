// const carros = [
//   { modelo: "Corsa", marca: "Chevrolet", ano: 2015, preco: 21900 },
//   { modelo: "Sandero", marca: "Renault", ano: 2017, preco: 31500 },
//   { modelo: "Palio", marca: "Fiat", ano: 2014, preco: 19800 }
// ]

import dbKnex from "../data/db_config.js";

export const carroIndex = async (req, res) => {
  try {
    // obtém da tabela de carros todos os registros
    const carros = await dbKnex.select("*").from("carros");
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const carroStore = async (req, res) => {
  // atribui via desestruturação
  const { modelo, marca, ano, preco } = req.body;

  if (!modelo || !marca || !ano || !preco) {
    res.status(400).json({ id: 0, msg: "Erro... informe modelo, marca, ano e preco do veículo" });
    return;
  }

  try {
    //carros.push({ modelo, marca, ano, preco })
    const novo = await dbKnex("carros").insert({ modelo, marca, ano, preco });
    // novo[0] => retorna o id do registro inserido
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro... informe modelo, marca, ano e preco do veículo" });
  }
};

export const carroUpdate = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const { modelo, marca, ano, preco } = req.body;

  if (!modelo || !marca || !ano || !preco) {
    res.json({
      id: 0,
      msg: "Erro... informe modelo, marca, ano e preco do veículo",
    });
    return;
  }

  const alterado = await dbKnex("carros").where({ id }).update({ modelo, marca, ano, preco });

  res.json({ id, msg: "Ok! Alterado com sucesso", alterado });
};

export const carroDelete = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  //  carros.splice(id - 1, 1)
  await dbKnex("carros").where({ id }).del();

  res.json({ id, msg: "Ok! Excluído com sucesso" });
};

export const carroPesq = async (req, res) => {
  const { marca } = req.params;

  try {
    const carros = await dbKnex("carros").whereLike({ marca });
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro" + error.message });
  }
};

export const carroModelo = async (req, res) => {
  const { modelo } = req.params;

  try {
    const carros = await dbKnex("carros").whereLike("modelo", `%${modelo}%`);
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro" + error.message });
  }
};

export const carroIntervalo = async (req, res) => {
  const { from, to } = req.params;

  try {
    const carros = await dbKnex("carros").whereBetween("ano", [from, to]).orderBy("ano");
    res.status(200).json(carros);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro" + error.message });
  }
};
