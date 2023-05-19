/*
1) Você deve gerar o script para criar o banco:
*/

/* CRIAÇÃO DE SCHEMA / DEFINIÇÃO*/
DROP 
  SCHEMA IF EXISTS aula08;
CREATE SCHEMA aula08;
USE aula08;

-- PAIS
CREATE TABLE pais (
  id INT NOT NULL AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- CIDADE
CREATE TABLE cidade (
  id INT NOT NULL AUTO_INCREMENT, 
  nome VARCHAR(45) NULL, 
  uf CHAR(2) NULL, 
  PRIMARY KEY (id)
);

-- CINEMA
CREATE TABLE cinema (
  id INT NOT NULL AUTO_INCREMENT, 
  nomeFantasia VARCHAR(45) NOT NULL, 
  endereco VARCHAR(45) NOT NULL, 
  bairro VARCHAR(45) NOT NULL, 
  idCidade INT NOT NULL, 
  capacidade INT NOT NULL, 
  PRIMARY KEY (id)
);

-- GENERO
CREATE TABLE genero (
  id INT NOT NULL AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- ATOR
CREATE TABLE ator (
  id INT NOT NULL AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- FILME
CREATE TABLE filme (
  id INT NOT NULL AUTO_INCREMENT, 
  idGenero INT NOT NULL, 
  idPais INT NOT NULL, 
  idDiretor INT NOT NULL, 
  tituloOriginal VARCHAR(45) NOT NULL, 
  tituloPortugues VARCHAR(45) NULL, 
  duracao INT NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_filme_genero FOREIGN KEY (idGenero) REFERENCES genero (id), 
  CONSTRAINT fk_filme_pais FOREIGN KEY (idPais) REFERENCES pais (id), 
  CONSTRAINT fk_filme_ator FOREIGN KEY (idDiretor) REFERENCES ator (id)
);

-- ELENCO
CREATE TABLE elenco (
  idFilme INT NOT NULL, 
  idAtor INT NOT NULL, 
  PRIMARY KEY (idFilme, idAtor), 
  CONSTRAINT fk_elenco_filme FOREIGN KEY (idFilme) REFERENCES filme (id), 
  CONSTRAINT fk_elenco_ator FOREIGN KEY (idAtor) REFERENCES ator (id)
);

-- SESSAO
CREATE TABLE sessao (
  id INT NOT NULL AUTO_INCREMENT, 
  idCinema INT NOT NULL, 
  idFilme INT NOT NULL, 
  data DATE NOT NULL, 
  horaInicio TIME NOT NULL, 
  publico INT NOT NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_sessao_cinema FOREIGN KEY (idCinema) REFERENCES cinema (id), 
  CONSTRAINT fk_sessao_filme FOREIGN KEY (idFilme) REFERENCES filme (id)
);

-- USUARIO
CREATE TABLE usuario (
  id INT NOT NULL AUTO_INCREMENT, 
  idCidade INT NOT NULL, 
  nome VARCHAR(45) NULL, 
  email VARCHAR(100) NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_usuario_cidade FOREIGN KEY (idCidade) REFERENCES cidade (id)
);

-- TIPO PAGAMENTO
CREATE table tipoPagto (
  id INT NOT NULL AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- VENDA
CREATE TABLE venda (
  id INT NOT NULL AUTO_INCREMENT, 
  idSessao INT NOT NULL, 
  idTipoPagto INT NOT NULL, 
  idUsuario INT NOT NULL, 
  data DATE NULL, 
  hora TIME NULL, 
  valorIngresso DOUBLE NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_venda_sessao FOREIGN KEY (idSessao) REFERENCES sessao (id), 
  CONSTRAINT fk_venda_usuario FOREIGN KEY (idUsuario) REFERENCES usuario (id), 
  CONSTRAINT fk_venda_tipoPagto FOREIGN KEY (idTipoPagto) REFERENCES tipoPagto (id)
);

-- PARCELA
CREATE table parcela (
  id INT NOT NULL AUTO_INCREMENT, 
  idVenda INT NOT NULL, 
  valor DOUBLE, 
  vencimento DATE, 
  situacao VARCHAR(45), 
  PRIMARY KEY (id, idVenda), 
  CONSTRAINT fk_venda_parcela FOREIGN KEY (idVenda) REFERENCES venda (id)
);
