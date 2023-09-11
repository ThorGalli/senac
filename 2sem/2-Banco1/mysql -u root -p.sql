-- mysql - u root - p SHOW DATABASES;
DROP DATABASE IF EXISTS aula09;
CREATE DATABASE IF NOT EXISTS aula09;
USE aula09;
CREATE TABLE departamento(
  codigo INT(11) NOT NULL,
  nome VARCHAR(15) NOT NULL,
  PRIMARY KEY(codigo)
);
CREATE TABLE empregado(
  matricula INT(9) NOT NULL,
  nome VARCHAR(15) NOT NULL,
  dataNasc DATE,
  endereco VARCHAR(30),
  sexo CHAR(1),
  salario DECIMAL(10, 2),
  codDep INT(11) NOT NULL,
  PRIMARY KEY(matricula),
  FOREIGN KEY(codDep) REFERENCES departamento(codigo)
);