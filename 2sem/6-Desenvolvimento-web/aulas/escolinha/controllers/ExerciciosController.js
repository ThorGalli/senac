import dbKnex from "../data/db_config.js";

export const exercIndex = async (req, res) => {
  try {
    const exercicios = await dbKnex.select("*").from("exercicios").orderBy("nome");
    res.status(200).json(exercicios);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const exercStore = async (req, res) => {
  const { nome, fraseantes, frasedepois, resposta, alternativa1, alternativa2 } = req.body;

  if (!nome || !resposta || !alternativa1 || (!fraseantes && !frasedepois)) {
    res.status(400).json({
      id: 0,
      msg: 'Erro... Os campos "nome", "resposta" e "alternativa1" são obrigatórios. Além disso, é necessário pelo menos uma "fraseantes" ou uma "frasedepois". ',
    });
    return;
  }

  try {
    const novo = await dbKnex("exercicios").insert({
      nome,
      fraseantes,
      frasedepois,
      resposta,
      alternativa1,
      alternativa2,
    });
    res.status(201).json({ id: novo[0], msg: "Exercício adicionado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const exercUpdate = async (req, res) => {
  const { id } = req.params;

  const { nome, fraseantes, frasedepois, resposta, alternativa1, alternativa2 } = req.body;

  try {
    await dbKnex("exercicios").where({ id }).update({
      nome,
      fraseantes,
      frasedepois,
      resposta,
      alternativa1,
      alternativa2,
    });

    res.status(200).json({ id, msg: "Exercício alterado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const exercDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("exercicios").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Exercício excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const exercPesq = async (req, res) => {
  const { nome } = req.params;

  try {
    const exercs = await dbKnex("exercicios").whereLike("nome", `%${nome}%`);
    res.status(200).json(exercs);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
