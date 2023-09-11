import dbKnex from "../dados/db_config.js";
import ejs from "ejs";
import puppeteer from "puppeteer";

export const shopIndex = async (req, res) => {
  try {
    // obtém da tabela de user todos os registros
    const shops = await dbKnex.select("*").from("shop");
    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const shopCreate = async (req, res) => {
  // atribui via desestruturação
  const { name, description } = req.body;

  // se não informou estes atributos
  if (!name) {
    res.status(400).json({ id: 0, msg: "Erro... informe name" });
    return;
  }

  try {
    const novo = await dbKnex("shop").insert({
      name,
      description: description || "",
    });
    // novo[0] => retorna o id do registro inserido
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const shopUpdate = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const { name, description, gold } = req.body;

  try {
    await dbKnex("shop").where({ id }).update({ name, description, gold });
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const shopDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex("shop").where({ id }).del();
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const shopInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await dbKnex("shop").where({ id });
    const { name, description, gold } = shop[0];
    const items = await dbKnex
      .select("item.*")
      .from("item")
      .join("shop_inventory as si", { "item.id": "si.item_id" })
      .where({ shop_id: id });

    res.status(200).json({ name, description, gold, items });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const addItemToShop = async (req, res) => {
  const { shop_id, item_id } = req.body;

  if (!shop_id || !item_id) {
    res.status(400).jsonc({ id: 0, msg: "Erro... informe os ids de loja e item." });
    return;
  }

  const shop = await dbKnex("shop").where({ id: shop_id });
  const item = await dbKnex("item").where({ id: item_id });
  if (shop.length == 0 || item.length == 0) {
    res.status(400).json({ id: 0, msg: "Erro... Loja ou item não encontrados" });
    return;
  }

  try {
    const novo = await dbKnex("shop_inventory").insert({
      shop_id,
      item_id,
    });
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const buyItem = async (req, res) => {
  const { shop_id, user_id, item_id, amount } = req.body;

  // Item está a venda nessa loja?
  const hasItem = await dbKnex("shop_inventory").where({ item_id, shop_id });
  if (hasItem == 0) {
    res.status(400).json({ id: 0, msg: "Item não encontrado." });
    return;
  }

  // User existe?
  const user = await dbKnex("user").where({ id: user_id });
  if (user.length == 0) {
    res.status(400).json({ id: 0, msg: "Usuário não encontrado." });
    return;
  }

  // Use tem gold?
  const item = await dbKnex("item").where({ id: item_id });
  const total = item[0].price * amount;
  if (user[0].gold < total) {
    res.status(400).json({ id: 0, msg: "Você não tem gold o suficiente para essa compra :(" });
    return;
  }

  const sale = await dbKnex.transaction();

  try {
    const hasItem = await sale("user_inventory").where({ item_id, user_id });
    if (hasItem.length == 0) {
      await sale("user_inventory").insert({ user_id, item_id, amount });
    } else {
      await sale("user_inventory").where({ user_id, item_id }).increment({ amount });
    }
    await sale("shop").where({ id: shop_id }).increment({ gold: total });
    await sale("user").where({ id: user_id }).decrement({ gold: total });

    await sale.commit();

    res.status(201).json("Ok! Compra concluída!");
  } catch (error) {
    await sale.rollback();
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const getShopView = async (req, res) => {
  try {
    const shops = await dbKnex("shop").select("*").orderBy("gold", "desc");
    ejs.renderFile("views/shopReport.ejs", { shops }, (err, html) => {
      if (err) {
        return res.status(400).send("Erro na geração da página");
      }
      res.status(200).send(html);
    });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const salesReport = async (req, res) => {
  //  const browser = await puppeteer.launch({headless: false});
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // carrega a página da rota anterior (com a listagem dos produtos)
  await page.goto("http://localhost:3001/renderview");

  // aguarda a conclusão da exibição da página com os dados do banco
  await page.waitForNetworkIdle(0);

  // gera o pdf da página exibida
  const pdf = await page.pdf({
    printBackground: true,
    format: "A4",
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  });

  await browser.close();

  // define o tipo de retorno deste método
  res.contentType("application/pdf");

  res.status(200).send(pdf);
};
