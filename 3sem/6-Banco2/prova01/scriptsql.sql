DROP DATABASE IF EXISTS aula10;
CREATE DATABASE IF NOT EXISTS aula10;
USE aula10;

CREATE TABLE funcionario (
  id        INT AUTO_INCREMENT, 
  nome      VARCHAR(60) NOT NULL, 
  matricula VARCHAR(25) NOT NULL, 
  email     VARCHAR(255), 
  PRIMARY KEY (id)
);

CREATE TABLE produto (
  id          INT AUTO_INCREMENT, 
  descricao   VARCHAR(100) NOT NULL, 
  qtd_estoque INT, 
  PRIMARY KEY (id)
);

CREATE TABLE venda (
  id              INT AUTO_INCREMENT, 
  id_funcionario  INT NOT NULL, 
  data_venda     DATE NOT NULL, 
  nf              VARCHAR(12) NOT NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_venda_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionario (id)
);

CREATE TABLE item (
  venda_id    INT, 
  produto_id  INT, 
  qtd_venda   INT, 
  PRIMARY KEY (venda_id, produto_id), 
  CONSTRAINT fk_item_venda   FOREIGN KEY (venda_id)   REFERENCES venda (id)   ON DELETE CASCADE ON UPDATE CASCADE, 
  CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produto (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO funcionario (nome, matricula, email) VALUES ("Andre Rieu", "121", "dede@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Arthur Aguiar", "122", "arthur@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Diego Maradona", "123", "dieguito@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Elias Elijah", "124", "saile@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Gabriel (Anjo)", "125", "gabi@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Humberto Gessinger", "126", "bebeto@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("John Travolta", "127", "jojo@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Mariana Rios", "128", "anairam@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Pedro Scooby", "129", "pedrinho@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Renan Calheiros", "120", "rere@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Ricardo Eletro", "221", "riri@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Richard Gere", "222", "richinho@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Sandro Sotilli", "223", "sandrinho@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("William Bonner", "224", "will@gmail.com");
INSERT INTO funcionario (nome, matricula, email) VALUES ("Yuri Gagarin", "225", "yuyu@gmail.com");

INSERT INTO produto (descricao, qtd_estoque) VALUES("Maionese viajandona", 10);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Tequila sem alcool", 20);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Tomate verde frito", 20);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Batata doce salgada", 30);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Mouse chocante", 10);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Teclado falante", 40);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Cadeira voadora", 10);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Sombra incolor", 10);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Ratoeira com rato", 20);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Netflix em capsulas", 20);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Palito (sim. Palito mesmo)", 10);
INSERT INTO produto (descricao, qtd_estoque) VALUES("Sabonete de chucrute", 30);

INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (2, "2023-05-06", "321");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (2, "2023-05-06", "456");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (1, "2023-05-06", "457");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (3, "2023-05-06", "654");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (2, "2023-05-06", "655");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (4, "2023-05-06", "789");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (8, "2023-05-06", "791");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (9, "2023-05-06", "792");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (1, "2023-05-06", "879");
INSERT INTO venda (id_funcionario, data_venda, nf) VALUES (5, "2023-05-06", "987");

-- < ############################### THOR ############################### > --

-- 1) Crie um gatilho (trigger) para baixar o estoque (qtd_estoque) de um produto
--    quando ele for vendido (registro inserido na tabela item).
DELIMITER $$
  CREATE TRIGGER trg_vendaitem 
    AFTER INSERT ON item
    FOR EACH ROW
    BEGIN
      UPDATE produto SET qtd_estoque = qtd_estoque - NEW.qtd_venda
      WHERE id = NEW.produto_id;
  END$$
DELIMITER ;

-- 2) Crie um gatilho (trigger) para retornar o estoque (qtd_estoque) de um produto
--    quando a venda dele for excluída (registro excluído da tabela item).
DELIMITER $$
  CREATE TRIGGER trg_deleteitem AFTER DELETE ON item
    FOR EACH ROW
    BEGIN
      UPDATE produto SET qtd_estoque = qtd_estoque + OLD.qtd_venda
      WHERE id = NEW.produto_id;
  END$$
DELIMITER ;

-- 3) Crie um procedimento (stored procedure) que receba o id de uma venda
-- e retorne (exiba no terminal) a quantidade de itens vendidos nesta venda.
DELIMITER $$
	CREATE PROCEDURE pesqVendaID(val int)
	BEGIN
		SELECT SUM(qtd_venda) AS TotalItensVendidos FROM item WHERE item.venda_id = val;
	END$$
DELIMITER ;

-- 4) (20%) Crie um gatilho (trigger) que ao incluir um funcionário,
--    caso não seja informado um e-mail, cadastre-o com o e-mail “alamaula@gmail.com”.
DELIMITER $$
  CREATE TRIGGER trg_insertfuncionario BEFORE INSERT ON funcionario
    FOR EACH ROW
    BEGIN
      IF NEW.email IS NULL THEN
        SET NEW.email = “alamaula@gmail.com”;
      END IF;
  END$$
DELIMITER ;

-- 5) Crie um procedimento (stored procedure) que receba o número de uma nota fiscal (nf)
--    e retorne (exiba no terminal) a quantidade de itens vendidos nesta venda.
DELIMITER $$
	CREATE PROCEDURE pesqVendaNF(val int)
	BEGIN
		SELECT SUM(venda_item.qtd_venda) AS TotalItensVendidos FROM 
      (SELECT * FROM item
      INNER JOIN venda
      WHERE venda.id = item.venda_id) AS venda_item
      WHERE
      venda_item.nf = val;
	END$$
DELIMITER ;

-- <\ ############################### THOR ############################### > --

INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (1, 5, 2);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (1, 5, 1);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (2, 2, 4);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (3, 3, 2);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (3, 1, 1);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (4, 4, 3);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (5, 1, 6);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (6, 2, 4);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (7, 2, 2);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (8, 8, 6);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (9, 10, 7);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (10, 8, 8);
INSERT INTO item (venda_id, produto_id, qtd_venda) VALUES (10, 7, 1);

select * from produto;
