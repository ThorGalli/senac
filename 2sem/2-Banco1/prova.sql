-- 01 - Criar as tabelas acima. Observe, atentamente, 
--    os tipos de dados de cada campo, as chaves primárias,
--    as chaves estrangeiras e os campos obrigatórios.
DROP DATABASE IF EXISTS provinhaglads;
CREATE DATABASE IF NOT EXISTS provinhaglads;
USE provinhaglads;
CREATE TABLE produto(
  codigo INT(11) NOT NULL,
  descricao VARCHAR(45) NOT NULL,
  qtdEstoque INT(11),
  PRIMARY KEY(codigo)
);
CREATE TABLE venda(
  id INT(11) NOT NULL,
  dataVenda DATE NOT NULL,
  nrNF VARCHAR(45),
  PRIMARY KEY(id)
);
CREATE TABLE item(
  produto_codigo INT(11) NOT NULL,
  venda_id INT(11) NOT NULL,
  qtdVenda INT(11),
  PRIMARY KEY(produto_codigo, venda_id),
  FOREIGN KEY(produto_codigo) REFERENCES produto(codigo),
  FOREIGN KEY(venda_id) REFERENCES venda(id)
);
-- 02: Cadastrar 4 produtos;
INSERT INTO produto (codigo, descricao, qtdEstoque)
VALUES (1, "limao siciliano un.", 100);
INSERT INTO produto (codigo, descricao, qtdEstoque)
VALUES (2, "acucar interseccao 1kg", 100);
INSERT INTO produto (codigo, descricao, qtdEstoque)
VALUES (3, "gelo filtrado 3kg", 100);
INSERT INTO produto (codigo, descricao, qtdEstoque)
VALUES (4, "vodka smirnoff 750ml", 100);
INSERT INTO produto (codigo, descricao, qtdEstoque)
VALUES (5, "agua 5l", 0);
-- 03 - Cadastrar 3 Vendas;
INSERT INTO venda (id, dataVenda, nrNF)
VALUES (1, "2020-10-28", "nrNFexemploDoBebum");
INSERT INTO venda (id, dataVenda, nrNF)
VALUES (2, "2020-10-29", "nrNFexemploVazia");
INSERT INTO venda (id, dataVenda, nrNF)
VALUES (3, "2020-10-30", "nrNFexemploVaziaTb");
INSERT INTO venda (id, dataVenda, nrNF)
VALUES (4, "2020-10-31", "nrNFexemploVaziaQuePena");
-- 04 - Cadastrar 4 itens;
INSERT INTO item (produto_codigo, venda_id, qtdVenda)
VALUES (1, 1, 30);
INSERT INTO item (produto_codigo, venda_id, qtdVenda)
VALUES (2, 1, 1);
INSERT INTO item (produto_codigo, venda_id, qtdVenda)
VALUES (3, 1, 1);
INSERT INTO item (produto_codigo, venda_id, qtdVenda)
VALUES (4, 1, 2);
-- 05 - Listar todos os campos de todos os produtos
--    em ordem alfabética (crescente) de descricao;
SELECT *
FROM produto
ORDER BY descricao ASC;
-- 06 - Listar descricao e qtdEstoque dos produtos com qtdEstoque menor do que 5;
SELECT descricao,
  qtdEstoque
FROM produto
WHERE qtdEstoque < 5;
-- 07 - Alterar para "Produto esgotado" o nome de todos os produtos com qtdEstoque menor ou igual a zero;
UPDATE produto
SET descricao = "Produto esgotado"
WHERE qtdEstoque <= 0;
-- 08 - Listar a dataVenda e nrNF de todas as vendas em ordem decrescente de dataVenda;
SELECT dataVenda,
  nrNF
FROM venda
ORDER BY dataVenda DESC;
-- 09 - Alterar para "2022-10-28" a dataVenda de todas a vendas;
UPDATE venda
SET dataVenda = "2022-10-28";
-- 10 - Listar todos os registros da tabela item, em ordem decrescente de qtdVenda.
SELECT *
FROM item
ORDER BY qtdVenda DESC;
-- GRANDE HA BRACO