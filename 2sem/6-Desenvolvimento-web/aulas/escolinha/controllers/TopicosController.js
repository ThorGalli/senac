import dbKnex from "../data/db_config.js";

export const topicosIndex = async (req, res) => {
  try {
    const topicos = await dbKnex.select("*").from("topicos").orderBy("titulo");
    res.status(200).json(topicos);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const topicosStore = async (req, res) => {
  // atribui via desestruturação
  const { autor, titulo, corpo, curtidas } = req.body;

  if (!autor || !titulo || !corpo) {
    res.status(400).json({
      id: 0,
      msg: 'Erro... Os campos "autor", "titulo" e "corpo" são obrigatórios. ',
    });
    return;
  }

  try {
    const novo = await dbKnex("topicos").insert({
      autor,
      titulo,
      corpo,
      curtidas,
    });
    res.status(201).json({ id: novo[0], msg: "Tópico adicionado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const topicosUpdate = async (req, res) => {
  const { id } = req.params;
  const { autor, titulo, corpo, curtidas } = req.body;

  try {
    await dbKnex("topicos").where({ id }).update({
      autor,
      titulo,
      corpo,
      curtidas,
    });

    res.status(200).json({ id, msg: "Tópico alterado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const topicosDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("topicos").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Tópico excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const topicosPesq = async (req, res) => {
  const { palavra } = req.params;

  try {
    const topicos = await dbKnex("topicos")
      .whereLike("titulo", `%${palavra}%`)
      .orWhereLike("corpo", `%${palavra}%`)
      .orWhereLike("autor", `%${palavra}%`);

    res.status(200).json(topicos);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const topicosIntervalo = async (req, res) => {
  const { from, to } = req.params;

  try {
    const topicos = await dbKnex("topicos")
      .whereBetween("curtidas", [from, to])
      .orderBy("curtidas");
    res.status(200).json(topicos);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
