/*
2) Crie INSERTS para popular as tabelas
*/

USE aula08;

SELECT * FROM filme;  -- Essa eu mandei bem

-- Ator

INSERT INTO ator (nome) VALUES('Adam Sandler');
INSERT INTO ator (nome) VALUES('Alex Gonçalves Macedo');
INSERT INTO ator (nome) VALUES('Anderson Miguel Gonçalves Ratto');
INSERT INTO ator (nome) VALUES('Andrei Lopes Granada');
INSERT INTO ator (nome) VALUES('Andressa Lima Melo');
INSERT INTO ator (nome) VALUES('Angelina Jolie');
INSERT INTO ator (nome) VALUES('Angelus Pax');
INSERT INTO ator (nome) VALUES('Arthur Sabino Granvilla da Silva');
INSERT INTO ator (nome) VALUES('Augusto Pedroso Rodrigues');
INSERT INTO ator (nome) VALUES('Ben Stiller');
INSERT INTO ator (nome) VALUES('Brendon Luiz Fagundes Borba');
INSERT INTO ator (nome) VALUES('Bruno Neto Silveira');
INSERT INTO ator (nome) VALUES('Charlize Theron');
INSERT INTO ator (nome) VALUES('Chris Hemsworth');
INSERT INTO ator (nome) VALUES('Christian da Silveira Neuschrank');
INSERT INTO ator (nome) VALUES('Cristoffer Rodrigues Lane');
INSERT INTO ator (nome) VALUES('Denzel Washington');
INSERT INTO ator (nome) VALUES('Diego Harter da Paz Silva');
INSERT INTO ator (nome) VALUES('Eduardo Bronx');
INSERT INTO ator (nome) VALUES('Eduardo Sedrez Rodrigues');
INSERT INTO ator (nome) VALUES('Emmanuelle Riva');
INSERT INTO ator (nome) VALUES('Felipe Schein Mello');
INSERT INTO ator (nome) VALUES('Filipe Moraes Xavier');
INSERT INTO ator (nome) VALUES('Filipe Siega Barbosa');
INSERT INTO ator (nome) VALUES('Gabriel Cunha Huber');
INSERT INTO ator (nome) VALUES('Gabriel Hartwig Silva');
INSERT INTO ator (nome) VALUES('Gabriel Islabao Tuchtenhagen');
INSERT INTO ator (nome) VALUES('Gabriel Moraes Chagas');
INSERT INTO ator (nome) VALUES('Gabriela França Cavalheiro');
INSERT INTO ator (nome) VALUES('Gladimau');
INSERT INTO ator (nome) VALUES('Gustavo Casarin da Silva');
INSERT INTO ator (nome) VALUES('Gustavo Marques Cardozo');
INSERT INTO ator (nome) VALUES('Helen Hunt');
INSERT INTO ator (nome) VALUES('Henrique Gautier Maria Xavier');
INSERT INTO ator (nome) VALUES('Hey Decio');
INSERT INTO ator (nome) VALUES('Igor Leon Borges Silva Simim');
INSERT INTO ator (nome) VALUES('Isadora Pereira Machado');
INSERT INTO ator (nome) VALUES('Jaison Luckow Silveira');
INSERT INTO ator (nome) VALUES('Jamie Foxx');
INSERT INTO ator (nome) VALUES('Jannifer Aniston');
INSERT INTO ator (nome) VALUES('Jason Clarke');
INSERT INTO ator (nome) VALUES('Jean Conceição dos Santos');
INSERT INTO ator (nome) VALUES('Jean-Louis Trintignant');
INSERT INTO ator (nome) VALUES('Jessica Chastain');
INSERT INTO ator (nome) VALUES('Jessica Paiva Gasque');
INSERT INTO ator (nome) VALUES('Joaquim Phoenix');
INSERT INTO ator (nome) VALUES('John Hawkes');
INSERT INTO ator (nome) VALUES('João Vitor dos Santos Timm');
INSERT INTO ator (nome) VALUES('Juan Renato Castro Brys');
INSERT INTO ator (nome) VALUES('Juan Schiavon Guido');
INSERT INTO ator (nome) VALUES('Jude Law');
INSERT INTO ator (nome) VALUES('Kaleu Brandão Farias');
INSERT INTO ator (nome) VALUES('Keira Knightley');
INSERT INTO ator (nome) VALUES('Kevin dos Santos Arnoldt');
INSERT INTO ator (nome) VALUES('Kristen Connolly');
INSERT INTO ator (nome) VALUES('Kristen Stewart');
INSERT INTO ator (nome) VALUES('Leon Denis Safadi Dode Júnior');
INSERT INTO ator (nome) VALUES('Leonardo Dicaprio');
INSERT INTO ator (nome) VALUES('Leonidio Tessmann Junior');
INSERT INTO ator (nome) VALUES('Lucas Alves Mesko');
INSERT INTO ator (nome) VALUES('Lucas dos Santos Silva');
INSERT INTO ator (nome) VALUES('Lucas Kauê Farias Ferreira');
INSERT INTO ator (nome) VALUES('Lucas Lettnin Lopes');
INSERT INTO ator (nome) VALUES('Lucas Santos Ferreira');
INSERT INTO ator (nome) VALUES('Marcio Richele Nunes Alves');
INSERT INTO ator (nome) VALUES('Matthew McConaughey');
INSERT INTO ator (nome) VALUES('Meryl Streep');
INSERT INTO ator (nome) VALUES('Michael Douglas');
INSERT INTO ator (nome) VALUES('Nathalia Del Vale');
INSERT INTO ator (nome) VALUES('Otávio Augusto Braga Mastrantonio');
INSERT INTO ator (nome) VALUES('Otávio Luis Iacks Thôncke');
INSERT INTO ator (nome) VALUES('Pablo Milanescobar');
INSERT INTO ator (nome) VALUES('Pedro da Silveira Sayão Lobato');
INSERT INTO ator (nome) VALUES('Pedro Gentil Roodes Rodrigues');
INSERT INTO ator (nome) VALUES('Pedro Henrique Menna Coitinho');
INSERT INTO ator (nome) VALUES('Pedro Henrique Nascimento Antunes');
INSERT INTO ator (nome) VALUES('Pedro Jardel Zago Lima');
INSERT INTO ator (nome) VALUES('Pierre da Costa Iost');
INSERT INTO ator (nome) VALUES('Pâmela Silva Woigt');
INSERT INTO ator (nome) VALUES('Roberto Lukas Pereira Diago');
INSERT INTO ator (nome) VALUES('Róger Ânderson Rodrigues Garcia Correa');
INSERT INTO ator (nome) VALUES('Samuel Fischer Klug');
INSERT INTO ator (nome) VALUES('Suélen Lopes Silveira de Oliveira');
INSERT INTO ator (nome) VALUES('Tales Spindler Magnante');
INSERT INTO ator (nome) VALUES('Thalles Bernardo Quevedo Ribeiro');
INSERT INTO ator (nome) VALUES('Thomas Mauricio Gebhardt Blanco');
INSERT INTO ator (nome) VALUES('Thor Lima Galli');
INSERT INTO ator (nome) VALUES('Tom Cruise');
INSERT INTO ator (nome) VALUES('Vagner Fernandes Link Junior');
INSERT INTO ator (nome) VALUES('Verônica Acedero Schiller');
INSERT INTO ator (nome) VALUES('Will Smith');
INSERT INTO ator (nome) VALUES('William Bonat Bizarro');
INSERT INTO ator (nome) VALUES('William Lopes Silveira');

-- Diretor
INSERT INTO ator (nome) VALUES('Martin Scorsese');
INSERT INTO ator (nome) VALUES('Quentin Tarantino');
INSERT INTO ator (nome) VALUES('Roman Polanski');
INSERT INTO ator (nome) VALUES('Steven Spilberg');
INSERT INTO ator (nome) VALUES('Robert Zemeckis');
INSERT INTO ator (nome) VALUES('Joe Wright');
INSERT INTO ator (nome) VALUES('Ben Lewin');
INSERT INTO ator (nome) VALUES('Paul Thomas Anderson');
INSERT INTO ator (nome) VALUES('William Friedkin');
INSERT INTO ator (nome) VALUES('Kathryn Bigelow');
INSERT INTO ator (nome) VALUES('Michael Haneke');
INSERT INTO ator (nome) VALUES('Drew Goddard');
	
-- País
INSERT INTO pais (nome) VALUES ('Brasil');
INSERT INTO pais (nome) VALUES ('Estados Unidos');
INSERT INTO pais (nome) VALUES ('Inglaterra');
INSERT INTO pais (nome) VALUES ('França');
INSERT INTO pais (nome) VALUES ('Argentina');


-- cidade
INSERT INTO cidade (nome, uf) VALUES ('Pelotas', 'RS');
INSERT INTO cidade (nome, uf) VALUES ('Arroio Grande', 'RS');
INSERT INTO cidade (nome, uf) VALUES ('Campinas', 'SP');
INSERT INTO cidade (nome, uf) VALUES ('Herval', 'RS');
INSERT INTO cidade (nome, uf) VALUES ('Jaguarão', 'RS');

-- Gênero
INSERT INTO genero (nome) VALUES ('Comédia');
INSERT INTO genero (nome) VALUES ('Ficção');
INSERT INTO genero (nome) VALUES ('Drama');
INSERT INTO genero (nome) VALUES ('Aventura');
INSERT INTO genero (nome) VALUES ('Suspense');
INSERT INTO genero (nome) VALUES ('Terror');
INSERT INTO genero (nome) VALUES ('Policial');
INSERT INTO genero (nome) VALUES ('Faroeste');

-- Filme
INSERT INTO filme 
(tituloOriginal, tituloPortugues, duracao, idDiretor, idGenero, idPais) 
VALUES 
('Flight', 'O Voo',138,5,3,2),
('Anna Karenina', 'Anna Karenina',131,6,3,3),
('The Sessions', 'As Sessões',98,7,1,2),
('Django Unchained', 'Django Livre',164,2,8,2),
('The Master', 'O Mestre',144,8,3,2),
('Killer Joe', 'Killer Joe - Matador de Aluguel',102,9,5,2),
('Zero Dark Thirty', 'A Hora Mais Escura',157,10,5,2),
('Amour', 'Amor',127,11,3,4),
('The Cabin in The Woods', 'O Segredo da Cabana',105,12,6,2),
('La Murga Loca', 'Don Angelus Pax de volta ao lar',90,28,1,5),
('Cucarachas Assassinas', 'Hey! Hey! Hey! Hey Decio é nosso... Rei',90,29,1,5);

-- Elenco
INSERT INTO elenco (idFilme, idAtor) VALUES (1,12);
INSERT INTO elenco (idFilme, idAtor) VALUES (1,26);
INSERT INTO elenco (idFilme, idAtor) VALUES (2,13);
INSERT INTO elenco (idFilme, idAtor) VALUES (2,14);
INSERT INTO elenco (idFilme, idAtor) VALUES (3,15);
INSERT INTO elenco (idFilme, idAtor) VALUES (3,16);
INSERT INTO elenco (idFilme, idAtor) VALUES (4, 4);
INSERT INTO elenco (idFilme, idAtor) VALUES (4,17);
INSERT INTO elenco (idFilme, idAtor) VALUES (5,18);
INSERT INTO elenco (idFilme, idAtor) VALUES (6,19);
INSERT INTO elenco (idFilme, idAtor) VALUES (7,20);
INSERT INTO elenco (idFilme, idAtor) VALUES (7,21);
INSERT INTO elenco (idFilme, idAtor) VALUES (8,22);
INSERT INTO elenco (idFilme, idAtor) VALUES (8,23);
INSERT INTO elenco (idFilme, idAtor) VALUES (9,24);
INSERT INTO elenco (idFilme, idAtor) VALUES (9,25);

-- cinema
INSERT INTO cinema 
(nomeFantasia, endereco, bairro, idCidade, capacidade) 
VALUES 
('Cine Art Pelotas', 'Rua Andrade Neves, 1510', 'Centro',1, 400),
('Cine Mart Pelotas', 'Rua Andrade Neves, 1511', 'Centro',1, 300),
('Cine Part Pelotas', 'Rua Andrade Neves, 1512', 'Centro',1, 250),
('Cineart', 'Avenida Edméia Matos Lazzarotti, 1655', 'Centro',2, 400),
('Cine Art RG', 'Av Oswaldo Barros, 251', 'Centro',3, 400),
('Cine Art PoA', 'Av das Nações, 665', 'Centro',4, 700),
('Cine Freak PoA', 'Av das Monções, 667', 'Centro',4, 500);

-- sessao
INSERT INTO sessao 
(idCinema, idFilme, data, horaInicio, publico) 
VALUES 
(1, 2, '2023-04-01', '16:00:00',  45),
(1, 2, '2023-04-01', '19:00:00',  80),
(1, 9, '2023-04-01', '21:30:00',  95),
(2, 1, '2023-04-01', '16:00:00',  38),
(2, 1, '2023-04-01', '19:00:00',  55),
(2, 8, '2023-04-01', '21:30:00', 110),
(3, 6, '2023-04-01', '16:00:00',  60),
(3, 6, '2023-04-01', '19:00:00',  75),
(4, 7, '2023-04-01', '18:00:00', 185),
(5, 1, '2023-04-01', '16:00:00', 145),
(5, 1, '2023-04-01', '20:00:00', 249),
(6, 6, '2023-04-01', '15:00:00', 314),
(6, 2, '2023-04-01', '19:40:00', 489),
(6, 9, '2023-04-01', '21:45:00', 548),
(1, 2, '2023-04-02', '16:00:00',  64),
(1, 2, '2023-04-02', '19:00:00',  98),
(1, 9, '2023-04-02', '21:30:00', 114),
(2, 1, '2023-04-02', '16:00:00',  57),
(2, 1, '2023-04-02', '19:00:00',  78),
(2, 8, '2023-04-02', '21:30:00', 134),
(3, 6, '2023-04-02', '16:00:00',  48),
(3, 6, '2023-04-02', '19:00:00',  75),
(4, 7, '2023-04-02', '18:00:00', 158),
(5, 1, '2023-04-02', '16:00:00', 105),
(5, 1, '2023-04-02', '20:00:00', 214),
(6, 6, '2023-04-02', '15:00:00', 289),
(6, 2, '2023-04-02', '19:40:00', 425),
(6, 9, '2023-04-02', '21:45:00', 502),
(1, 2, '2023-04-03', '16:00:00',  95),
(1, 2, '2023-04-03', '19:00:00', 124),
(1, 9, '2023-04-03', '21:30:00', 158),
(2, 1, '2023-04-03', '16:00:00',  46),
(2, 1, '2023-04-03', '19:00:00',  97),
(2, 8, '2023-04-03', '21:30:00', 187),
(3, 6, '2023-04-03', '16:00:00',  87),
(3, 6, '2023-04-03', '19:00:00', 105),
(4, 7, '2023-04-03', '18:00:00', 198),
(5, 1, '2023-04-03', '16:00:00',  97),
(5, 1, '2023-04-03', '20:00:00', 248),
(6, 6, '2023-04-03', '15:00:00', 314),
(6, 2, '2023-04-03', '19:40:00', 499),
(6, 9, '2023-04-03', '21:45:00', 587),
(1, 2, '2023-04-04', '16:00:00',  55),
(1, 2, '2023-04-04', '19:00:00', 108),
(1, 9, '2023-04-04', '21:30:00', 187),
(2, 1, '2023-04-04', '16:00:00',  67),
(2, 1, '2023-04-04', '19:00:00',  89),
(2, 8, '2023-04-04', '21:30:00', 144),
(3, 6, '2023-04-04', '16:00:00',  75),
(3, 6, '2023-04-04', '19:00:00', 101),
(4, 7, '2023-04-04', '18:00:00', 149),
(5, 1, '2023-04-04', '16:00:00', 115),
(5, 1, '2023-04-04', '20:00:00', 268),
(6, 6, '2023-04-04', '15:00:00', 387),
(6, 2, '2023-04-04', '19:40:00', 455),
(6, 9, '2023-04-04', '21:45:00', 608);

-- usuario
INSERT INTO usuario 

(idCidade, nome, email) 
VALUES 
	(3, 'Edecius', 'compreolivro@javascript.com'),
	(3, 'Mussum', 'cacildis@senacrs.com.br'),
	(2, 'Angelis', 'angel@hotwheels.com'),
	(1, 'Satolepis', 'pelotis@docis.com'),
	(5, 'Senaquius', 'senaquinho@meuprecioso.com'),
	(4, 'Gladimiris', 'ouniconormal@minecraft.com');

INSERT INTO tipoPagto (nome) VALUES ('A Vista');
INSERT INTO tipoPagto (nome) VALUES ('Parcelado');

-- venda
INSERT INTO venda 
(idSessao, idUsuario, data, hora, valorIngresso, idTipoPagto) 
VALUES 
	( 2, 1, '2023-04-01', '16:00:00' ,15.00, 1),
	( 4, 2, '2023-04-01', '16:00:00' ,10.00, 2),
	(13, 3, '2023-04-01', '16:00:00' ,12.00, 2),
	(14, 4, '2023-04-01', '20:00:00' ,12.00, 2),
	(17, 5, '2023-04-01', '21:45:00' ,18.00, 1),
	(19, 6, '2023-04-01', '18:50:00' ,18.00, 1),
	(22, 1, '2023-04-02', '19:00:00' ,15.00, 1),
	(23, 2, '2023-04-02', '21:30:00' ,15.00, 1),
	(14, 3, '2023-04-01', '20:00:00' ,12.00, 1),
	(20, 6, '2023-04-01', '21:40:00' ,18.00, 1),
	(15, 5, '2023-04-01', '15:00:00' ,18.00, 1);

-- INSERIR NA PARCELA
INSERT INTO parcela 
(idVenda, valor, vencimento, situacao)
VALUES
(2,  5.00, '2023-04-01', 'ABERTO'),
(2,  5.00, '2023-04-02', 'ABERTO'),
(2,  5.00, '2023-04-03', 'ABERTO'),
(3,  5.00, '2023-04-01', 'ABERTO'),
(3,  5.00, '2023-04-02', 'ABERTO'),
(4, 12.00, '2023-04-03', 'ABERTO');
