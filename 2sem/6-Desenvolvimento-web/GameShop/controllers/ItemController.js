import dbKnex from "../dados/db_config.js";

export const itemIndex = async (req, res) => {
  try {
    const items = await dbKnex.select("*").from("item");
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const itemCreate = async (req, res) => {
  const { name, description, price, icon_id } = req.body;
  if (!name || !price) {
    res.status(400).json({ id: 0, msg: "Erro... informe name, price" });
    return;
  }

  try {
    const novo = await dbKnex("item").insert({
      name,
      description: description || "",
      price,
      icon_id: icon_id || 0,
    });
    // novo[0] => retorna o id do registro inserido
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const itemUpdate = async (req, res) => {
  const { id } = req.params;

  const { name, description, price, icon_id } = req.body;

  try {
    await dbKnex("item").where({ id }).update({ name, description, price, icon_id });
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const itemDelete = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  try {
    await dbKnex("item").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
