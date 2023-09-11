import dbKnex from "../dados/db_config.js";

export const avatarIndex = async (req, res) => {
  try {
    const avatars = await dbKnex.select("*").from("avatar");
    res.status(200).json(avatars);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const avatarCreate = async (req, res) => {
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
    const novo = await dbKnex("avatar").insert({ name, filePath, fileName });
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const avatarUpdate = async (req, res) => {
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
    await dbKnex("avatar").where({ id }).update({ name, filePath, fileName });
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const avatarDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("avatar").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
