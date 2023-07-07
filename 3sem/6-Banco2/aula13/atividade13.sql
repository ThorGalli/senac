-- como root:
-- 1, 2
DROP DATABASE IF EXISTS aula13;
CREATE DATABASE IF NOT EXISTS aula13;
USE aula13;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fone VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE forum (
    id INT AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    data_criacao DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE postagem (
    usuario_id INT,
    forum_id INT,
    mensagem TEXT NOT NULL,
    data_postagem DATETIME DEFAULT NOW(),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (forum_id) REFERENCES forum(id)
);

-- 3
CREATE USER 'moderador'@'localhost' IDENTIFIED BY 'senacrs';
GRANT INSERT, UPDATE, DELETE ON aula13.* TO 'moderador'@'localhost';

-- 4
CREATE USER 'pikachu'@'localhost' IDENTIFIED BY 'senacrs';
GRANT SELECT (mensagem) ON aula13.postagem TO 'pikachu'@'localhost';

-- 5
CREATE USER 'maverick'@'localhost' IDENTIFIED BY 'senacrs';
GRANT INSERT, UPDATE, DELETE ON aula13.postagem TO 'maverick'@'localhost';
GRANT INSERT, UPDATE, DELETE ON aula13.forum TO 'maverick'@'localhost';
GRANT SELECT ON aula13.usuario TO 'maverick'@'localhost';

FLUSH PRIVILEGES;

-- 6 como moderador:

INSERT INTO usuario (nome, email, fone) VALUES ('John Doe', 'johndoe@example.com', '123-456-7890');
INSERT INTO usuario (nome, email, fone) VALUES ('Jane Smith', 'janesmith@example.com', '987-654-3210');
INSERT INTO usuario (nome, email, fone) VALUES ('Mike Johnson', 'mikejohnson@example.com', '555-555-5555');
INSERT INTO usuario (nome, email, fone) VALUES ('Emily Davis', 'emilydavis@example.com', '111-222-3333');
INSERT INTO usuario (nome, email, fone) VALUES ('David Wilson', 'davidwilson@example.com', '444-444-4444');
INSERT INTO usuario (nome, email, fone) VALUES ('Jason Mcberg', 'jasonmcberg@example.com', '555-555-5555');
INSERT INTO usuario (nome, email, fone) VALUES ('Adam Thompson', 'adamthomp@example.com', '111-222-3333');
INSERT INTO usuario (nome, email, fone) VALUES ('Igor Perestroika', 'igorperes@example.com', '444-444-4444');

INSERT INTO forum (titulo) VALUES ('General Discussion');
INSERT INTO forum (titulo) VALUES ('Technical Support');
INSERT INTO forum (titulo) VALUES ('Announcements');
INSERT INTO forum (titulo) VALUES ('Feature Requests');
INSERT INTO forum (titulo) VALUES ('Off-topic');

-- 7 como moderador
SELECT * FROM forum;
SELECT * FROM usuario;
-- 7 como pikachu
SELECT * FROM forum;
SELECT * FROM usuario;
-- 7 como maverick
SELECT * FROM forum;
SELECT * FROM usuario;

-- 8 como maverick:
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (1, 1, 'Hello, everyone! Welcome to the forum.');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (2, 1, "I'm excited to join this community!");
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (3, 2, 'Having trouble with my computer. Need assistance.');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (4, 3, 'Important announcement: Server maintenance scheduled for tomorrow.');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (5, 4, 'I have a suggestion for a new feature. Who should I contact?');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (1, 2, 'How do I change a bulb?');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (2, 3, "Where's the bathroom?");
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (3, 4, 'I accidently deleted system32');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (4, 5, 'How do I install World of Warcraft in Arch Linux?');
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (5, 5, 'What was the first word you ever said?');

-- 9 como moderador
SELECT * FROM postagem;
-- 9 como pikachu
SELECT * FROM postagem;
-- 9 como maverick
SELECT * FROM postagem;

-- 10 como moderador:

SELECT f.titulo, u.nome, p.data_postagem
FROM postagem p
JOIN forum f ON p.forum_id = f.id
JOIN usuario u ON p.usuario_id = u.id;
-- Retorna:
-- ERROR 1142 (42000): SELECT command denied to user 'moderador'@'localhost' for table 'postagem'

-- 11 como pikachu:

SELECT f.titulo, u.nome, p.data_postagem
FROM postagem p
JOIN forum f ON p.forum_id = f.id
JOIN usuario u ON p.usuario_id = u.id;
-- Retorna:
-- ERROR 1142 (42000): SELECT command denied to user 'pikachu'@'localhost' for table 'forum'


-- 12 logar como root
-- 13 como root:
SELECT @@autocommit;
-- +--------------+
-- | @@autocommit |
-- +--------------+
-- |            1 |
-- +--------------+

-- 14 como root:
SET autocommit=0;

-- 15
SELECT * FROM postagem;

-- 16 
START TRANSACTION;

-- 17
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (3, 1, 'BANANA');

-- 18
SELECT * FROM postagem;

-- 19
ROLLBACK;

-- 20
SELECT * FROM postagem;

-- 21
START TRANSACTION;

-- 22
SELECT * FROM postagem;

-- 23
INSERT INTO postagem (usuario_id, forum_id, mensagem) VALUES (3, 1, 'ABACAXI');

-- 24
SELECT * FROM postagem;

-- 25
COMMIT;

-- 26
SELECT * FROM postagem;

-- 27
ROLLBACK;
SELECT * FROM postagem;

-- 28
SET autocommit=1;

-- 29 
DROP USER 'maverick'@'localhost'

-- 30
DROP USER 'pikachu'@'localhost'

-- 31
DROP USER 'moderador'@'localhost'

-- 32
SELECT f.titulo, u.nome, p.data_postagem
FROM postagem p
JOIN forum f ON p.forum_id = f.id
JOIN usuario u ON p.usuario_id = u.id
WHERE u.nome LIKE 'a%';