import dbKnex from "../dados/db_config.js";
import nodemailer from "nodemailer";
import md5 from "md5";
import * as dotenv from "dotenv";
dotenv.config();

export const userIndex = async (req, res) => {
  try {
    // obtém da tabela de user todos os registros
    const users = await dbKnex.select("*").from("user");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const userCreate = async (req, res) => {
  const { nickname, email, password } = req.body;
  if (!nickname || !email || !password) {
    res.status(400).json({ id: 0, msg: "Erro... informe nickname, email, password" });
    return;
  }

  try {
    const verifica = await dbKnex("user").where({ email });
    if (verifica.length > 0) {
      res.status(400).json({ id: 0, msg: "Erro... e-mail já em uso." });
      return;
    }
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    return;
  }

  const hash = md5(email + nickname + "(Edéc10)" + Date.now());
  try {
    const novo = await dbKnex("user").insert({ nickname, email, password, hash });
    send_email(nickname, email, hash).catch(console.error);
    res
      .status(201)
      .json({ id: novo[0], msg: "Confirme o seu cadastro a partir da sua conta de e-mail" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const userVerify = async (req, res) => {
  const { hash } = req.params;
  let user;

  try {
    user = await dbKnex("user").where({ hash });
    if (user.length == 0 || user[0].status == "verified") {
      res.status(400).json({ id: 0, msg: "Erro, link expirado ou inválido." });
      return;
    }
    await dbKnex("user").where({ hash }).update({ status: "verified" });
    res.status(200).json({ id: user.id, msg: "Ok! Alterado com sucesso!" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    return;
  }
};

export const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { nickname, avatar_id, gold, cash } = req.body;

  if (!avatar_id && !nickname && !gold && !cash) {
    res.status(400).json({
      id: 0,
      msg: "Erro... informe o avatar_id, nickname, gold ou cash",
    });
    return;
  }

  try {
    await dbKnex("user").where({ id }).update({ nickname, avatar_id, gold, cash });
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("user").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const userInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await dbKnex("user").where({ id });
    const { nickname, gold, cash } = user[0];
    const items = await dbKnex
      .select("item.*")
      .from("item")
      .join("user_inventory as ui", { "item.id": "ui.item_id" })
      .where({ user_id: id });

    res.status(200).json({ nickname, gold, cash, items });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

async function send_email(nickname, email, hash) {
  // dados de configuração da conta de onde partirá os e-mails
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASSWORD,
    },
  });

  const link = "http://localhost:3001/userverify/" + hash;

  let msg = `<p>Estimado sr(a): ${nickname}</p>`;
  msg += `<p>Confirme seu voto clicando no link a seguir:</p>`;
  msg += `<a href=${link}>Confirmação do Voto</a>`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Concurso Rainha Fenadoce" <fenadoce2023@email.com>', // sender address
    to: email, // list of receivers
    subject: "Confirmação do Voto", // Subject line
    text: `Para confirmar seu voto, copie e cole no browser o endereço ${link}`, // plain text body
    html: msg, // html body
  });
}
