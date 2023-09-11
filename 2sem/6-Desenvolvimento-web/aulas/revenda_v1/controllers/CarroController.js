// const carros = [
//   { modelo: "Corsa", marca: "Chevrolet", ano: 2015, preco: 21900 },
//   { modelo: "Sandero", marca: "Renault", ano: 2017, preco: 31500 },
//   { modelo: "Palio", marca: "Fiat", ano: 2014, preco: 19800 }
// ]

import knex from "../db_config.js";

export const carroIndex = async (req, res) => {
  const carros = await knex.select("*").from("carros_db");
  res.json(carros);
};

export const carroStore = async (req, res) => {
  const { modelo, marca, ano, preco } = req.body;
  if (!modelo || !marca || !ano || !preco) {
    res.json({
      id: 0,
      msg: "Erro... informe modelo, marca, ano e preco do veículo",
    });
    return;
  }
  const carros = await knex("carros_db").insert({ modelo, marca, ano, preco });
  res.json({ id: carros[0], msg: "Ok! Inserido com sucesso" });
};

export const carroUpdate = async (req, res) => {
  // atribui via desestruturação
  const { id } = req.params;
  const { modelo, marca, ano, preco } = req.body;

  if (!modelo || !marca || !ano || !preco) {
    res.json({
      id: 0,
      msg: "Erro... informe modelo, marca, ano e preco do veículo",
    });
    return;
  }

  await knex("carros_db").where({ id }).update({ modelo, marca, ano, preco });
  res.json({ msg: "Ok! Alterado com sucesso", carro: { id, modelo, marca, ano, preco } });
};

export const carroDelete = (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  if (id > carros.length) {
    res.json({ id: 0, msg: "Erro... código inválido" });
    return;
  }

  carros.splice(id - 1, 1);

  res.json({ id, msg: "Ok! Excluído com sucesso" });
};

export const carroPesq = (req, res) => {
  const { marca } = req.params;

  const lista = [];

  for (const carro of carros) {
    if (carro.marca.toUpperCase() == marca.toUpperCase()) {
      lista.push(carro);
    }
  }

  if (lista.length == 0) {
    res.json({ id: 0, msg: "Não há carros desta marca" });
    return;
  }

  res.json(lista);
};

export const carroIntervalo = (req, res) => {
  const { from, to } = req.params;

  const lista = [];

  for (const carro of carros) {
    if (carro.ano >= from && carro.ano <= to) {
      lista.push(carro);
    }
  }

  if (lista.length == 0) {
    res.json({ id: 0, msg: "Não há carros neste intervalo de anos" });
    return;
  }

  res.json(lista);
};
