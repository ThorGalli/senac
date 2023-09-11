import dbKnex from "../dados/db_config.js";
import md5 from "md5";
import nodemailer from "nodemailer";

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

// async..await is not allowed in global scope, must use a wrapper
async function send_email(nome, email, hash) {
  // dados de configuração da conta de onde partirá os e-mails
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d61ebc4c72487a",
      pass: "4348eff98fa9ba",
    },
  });

  const link = "http://localhost:3001/votos/confirma/" + hash;

  let mensa = `<p>Estimado sr(a): ${nome}</p>`;
  mensa += `<p>Confirme seu voto clicando no link a seguir:</p>`;
  mensa += `<a href=${link}>Confirmação do Voto</a>`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Concurso Rainha Fenadoce" <fenadoce2023@email.com>', // sender address
    to: email, // list of receivers
    subject: "Confirmação do Voto", // Subject line
    text: `Para confirmar seu voto, copie e cole no browser o endereço ${link}`, // plain text body
    html: mensa, // html body
  });
}

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

  // gera um "hash" (código) que será utilizado no e-mail para o
  // cliente confirmar o seu voto
  const hash = md5(email + candidata_id + Date.now());

  try {
    // insere um registro na tabela de votos
    const novo = await dbKnex("votos").insert({ nome, email, candidata_id, hash_conf: hash });

    // envia e-mail para que o cliente confirme o seu voto
    send_email(nome, email, hash).catch(console.error);

    // novo[0] => retorna o id do registro inserido
    res
      .status(201)
      .json({ id: novo[0], msg: "Confirme o seu voto a partir da sua conta de e-mail" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const votoConfirme = async (req, res) => {
  // recebe o hash do voto
  const { hash } = req.params;

  // para poder ser acessado fora do bloco
  let voto;

  try {
    // obtém da tabela de votos o registro cujo hash é o que foi passado
    // no e-mail
    voto = await dbKnex("votos").where({ hash_conf: hash });

    // se a consulta não retornou algum registro
    // (significa que o hash é inválido (o cliente poderia estar
    // tentado "burlar" o sistema))
    if (voto.length == 0) {
      res.status(400).json({ id: 0, msg: "Erro... copie corretamente o link" });
      return;
    }
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    return;
  }

  // define (inicia) uma nova transação
  const trx = await dbKnex.transaction();

  try {
    // 1ª operação da transação
    const novo = await trx("votos").where({ hash_conf: hash }).update({ confirmado: 1 });

    // 2ª operação da transação
    await trx("candidatas").where({ id: voto[0].candidata_id }).increment({ votos: 1 });

    // commit (grava) a transação
    await trx.commit();

    res.status(201).send("Ok! Voto confirmado com sucesso");
  } catch (error) {
    // rollback (volta) desfaz a operação realizada
    await trx.rollback();

    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
