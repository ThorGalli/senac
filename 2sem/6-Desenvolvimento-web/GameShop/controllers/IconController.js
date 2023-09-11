import dbKnex from "../dados/db_config.js";

export const iconIndex = async (req, res) => {
  try {
    const icons = await dbKnex.select("*").from("icon");
    res.status(200).json(icons);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const iconCreate = async (req, res) => {
  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const filePath = req.file.path;
  const fileName = req.file.filename;

  if (
    (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") ||
    req.file.size > 1024 * 1024
  ) {
    fs.unlinkSync(filePath);
    res.status(400).json({ msg: "Formato inválido da imagem ou imagem muito grande" });
    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).json({ id: 0, msg: "Erro... informe name." });
    return;
  }

  try {
    const novo = await dbKnex("icon").insert({ name, filePath, fileName });
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const iconUpdate = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const filePath = req.file.path;
  const fileName = req.file.filename;

  if (
    (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") ||
    req.file.size > 1024 * 1024
  ) {
    fs.unlinkSync(filePath);
    res.status(400).json({ msg: "Formato inválido da imagem ou imagem muito grande" });
    return;
  }

  try {
    await dbKnex("icon").where({ id }).update({ name, filePath, fileName });
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const iconDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("icon").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
