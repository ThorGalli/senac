SELECT @@sql_mode;
SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));


-- SET sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

/*
CRIE AS SEGUINTES CONSULTAS
*/
USE aula08;

/*
3) Crie uma consulta para listar o somatório do valor dos ingressos vendidos para cada filme onde o tipo de pagamento foi
parcelado. Liste o nome do filme e o somatório de valor de ingressos.
*/
SELECT filme.tituloPortugues,
       tipoPagto.nome AS 'Tipo Pagto.',
       SUM(venda.valorIngresso) AS 'Somatório (R$)'
FROM filme
INNER JOIN sessao ON sessao.idFilme = filme.id
INNER JOIN venda ON venda.idSessao = sessao.id
INNER JOIN tipoPagto ON tipoPagto.id = venda.idTipoPagto
WHERE tipoPagto.nome = 'Parcelado'
GROUP BY filme.tituloPortugues,
         tipoPagto.nome;
/*
4) Altere a consulta anterior para que, 
utilizando a propriedade HAVING, 
a consulta liste somente os filmes com mais de 2 ingressos vendidos.
Cadastre mais vendas se necessário
*/
SELECT filme.tituloPortugues,
       tipoPagto.nome AS 'Tipo Pagto.',
       COUNT(venda.id) AS 'Qtd Ingressos',
       SUM(venda.valorIngresso) AS 'Somatório (R$)'
FROM filme
INNER JOIN sessao ON sessao.idFilme = filme.id
INNER JOIN venda ON venda.idSessao = sessao.id
INNER JOIN tipoPagto ON tipoPagto.id = venda.idTipoPagto
WHERE tipoPagto.nome = 'Parcelado'
GROUP BY filme.tituloPortugues
HAVING COUNT(venda.id) > 3;

/*
5) Crie uma consulta para listar quantos usuários efetuaram compras à vista.
*/
SELECT COUNT(DISTINCT(venda.idUsuario)) AS 'Qtd. Usuarios'
FROM venda
WHERE venda.idTipoPagto = '1';

/*
6) Altere a consulta anterior para listar o nome do usuário que fez a compra e a quantidade de compras à vista;
*/

SELECT usuario.nome,
       COUNT(usuario.id) AS 'Quant. Usuario'
FROM venda
INNER JOIN usuario ON venda.idUsuario = usuario.id
WHERE venda.idTipoPagto = 1
GROUP BY usuario.nome;

-- ou

SELECT usuario.nome AS 'Usuario',
       tipoPagto.nome AS 'Tipo Pagto',
       SUM(venda.id) AS 'Qtd'
FROM venda
INNER JOIN usuario ON usuario.id = venda.idUsuario
INNER JOIN tipoPagto ON tipoPagto.id = venda.idtipoPagto
WHERE tipoPagto.nome = 'a vista'
GROUP BY usuario.nome;

/*
7) Crie uma stored procedure alteraValorIngresso(valor) que defina um novo valor aos ingressos já vendidos
por um valor informado na chamada da procedure, listando os ingressos em seguida na própria procedure;
*/
DROP PROCEDURE IF EXISTS alteraValorIngresso;

DELIMITER $$
	CREATE PROCEDURE alteraValorIngresso(val double)
	BEGIN
		UPDATE venda SET valorIngresso = val;
		SELECT * FROM venda;
	END $$
DELIMITER ;

-- Exemplo de chamada da Procedure
CALL alteraValorIngresso(20.55);

/*
8) Crie uma function alteraParcela(idUsuario) que altere a situação das parcelas de um usuário específico
para pagas. A função deve receber como entrada o id de um usuário qualquer e realizar a alteração
de todas as parcelas do usuário.
*/
DROP FUNCTION IF EXISTS alteraParcela;

DELIMITER $$
	CREATE FUNCTION alteraParcela(v_id INT) RETURNS VARCHAR(50) DETERMINISTIC
	BEGIN
		DECLARE msg VARCHAR(50);
		SET msg = 'OK!';
		UPDATE parcela SET situacao = 'PAGA'
		WHERE parcela.idVenda IN (SELECT venda.id
			                      FROM venda WHERE venda.idUsuario = v_id);
	RETURN msg;
	END $$
DELIMITER ;

-- Verificando a tabela de parcelas antes da execução do procedimento
SELECT * FROM parcela;

-- Executando o procedimento
SELECT alteraParcela(1);
	
-- Verificando como ficou a tabela de parcelas após a execução do procedimento
SELECT * FROM parcela;

/*
9) Crie uma stored procedure relVendas(Usuario), onde receba o id de algum usuário do sistema e liste todas as
parcelas de um usuário específico juntamente com a situação de pagamento das mesmas
*/
DROP PROCEDURE IF EXISTS relVendas;

DELIMITER $$
	CREATE PROCEDURE relVendas(Usuario int)
	BEGIN
		SELECT parcela.valor, parcela.vencimento, parcela.situacao
		FROM parcela
		INNER JOIN venda ON venda.id = parcela.idVenda
		INNER JOIN usuario ON usuario.id = venda.idUsuario
		WHERE usuario.id = Usuario;
	END $$
DELIMITER ;

-- Exemplo de chamada da Procedure	
CALL relVendas(1);

/*
10) Crie uma stored procedure visualizaVendas(tipoVenda) onde deve receber como argumento um inteiro 1 
para listar o somatório de vendas à vista ou 2 para o somatório de vendas à prazo.
*/
DROP PROCEDURE IF EXISTS visualizaVendas;

DELIMITER $$
	CREATE PROCEDURE visualizaVendas(tipoVenda INT)
	BEGIN
		IF tipoVenda = 1 THEN
			SELECT SUM(venda.valorIngresso) AS 'Soma a Vista'
			FROM venda
			INNER JOIN tipoPagto ON tipoPagto.id = venda.idTipoPagto
			WHERE tipoPagto.nome LIKE 'A vista';
		ELSE
			SELECT SUM(venda.valorIngresso) AS 'Soma a Prazo'
			FROM venda
			INNER JOIN tipoPagto ON tipoPagto.id = venda.idTipoPagto
			WHERE tipoPagto.nome LIKE 'A prazo';
		END IF;
	END $$
DELIMITER ;

-- Exemplo de chamada da Procedure
 CALL visualizaVendas(2);

-- ############################################################# --
