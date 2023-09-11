import dbKnex from "../dados/db_config.js";
import md5 from "md5";

export const votoIndex = async (req, res) => {
  try {
    // obtém da tabela de votos todos os registros
    const votos = await dbKnex
      .select("v.*", "c.nome as candidata")
      .from("votos as v")
      .innerJoin("candidatas as c", { "v.candidata_id": "c.id" });
    res.status(200).json(votos);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const votoStore = async (req, res) => {
  // atribui via desestruturação
  const { nome, email, candidata_id } = req.body;

  // se não informou estes atributos
  if (!nome || !email || !candidata_id) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, email e candidata_id do voto" });
    return;
  }

  try {
    // obtém da tabela de candidatas todos os registros da marca indicada
    const verifica = await dbKnex("votos").where({ email });

    // se a consulta retornou algum registro (significa que já votou)
    if (verifica.length > 0) {
      res.status(400).json({ id: 0, msg: "Erro... este e-mail já votou" });
      return;
    }
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    return;
  }

  const hash = md5(email + candidata_id + Date.now());

  try {
    // insere o registro na tabela de votos
    const novo = await dbKnex("votos").insert({ nome, email, candidata_id, hash_conf: hash });

    // novo[0] => retorna o id do registro inserido
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
