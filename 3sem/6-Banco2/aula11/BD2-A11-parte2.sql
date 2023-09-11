DROP DATABASE IF EXISTS aula11b;
CREATE DATABASE aula11b;
USE aula11b;

CREATE TABLE professores (
	id INT AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(100),
	sexo CHAR(1),
	PRIMARY KEY(id)
) ENGINE = InnoDB;

CREATE TABLE alunos (
	id INT AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR (100), 
	obs TEXT,
	PRIMARY KEY(id),
	FULLTEXT (nome, obs)
) ENGINE = MyISAM;

INSERT INTO alunos (nome,email,obs) VALUES ("Nomlanga D. Higgins","lacus.varius.et@liberoProin.edu","varius et, euismod et, commodo at,");
INSERT INTO alunos (nome,email,obs) VALUES ("Aurelia Caldwell","est.congue@eulacusQuisque.ca","orci lacus vestibulum lorem, sit amet ultricies sem");
INSERT INTO alunos (nome,email,obs) VALUES ("Brandon S. Kelly","intger.id@infaucibusorci.co.uk","Sed id risus quis diam luctus");
INSERT INTO alunos (nome,email,obs) VALUES ("Aurelia E. Ortega","mollis@enimsitamet.edu","tristique senectus et netus et malesuada fames ac");
INSERT INTO alunos (nome,email,obs) VALUES ("Charlotte Huff","eros@laoreet.edu","cubilia Curae;");
INSERT INTO alunos (nome,email,obs) VALUES ("Eaton Byers","ante@auctor.ca","mi");
INSERT INTO alunos (nome,email,obs) VALUES ("Kieran Glenn","nonummy.ac.feugiat@feugiatLorem.edu","nulla vulputate dui, nec tempus mauris erat");
INSERT INTO alunos (nome,email,obs) VALUES ("Sawyer Vasquez","accumsan.sed@velfaucibus.ca","a, facilisis non, bibendum");
INSERT INTO alunos (nome,email,obs) VALUES ("Jesse Fuller","Donec.egestas@enimMaurisquis.org","mauris eu elit.");
INSERT INTO alunos (nome,email,obs) VALUES ("Shelly Alford","nisl.arcu.iaculis@ullamcorpermagnaSed.org","ut, nulla. Cras eu");
INSERT INTO alunos (nome,email,obs) VALUES ("Martin K. Kelly","lacus.Etiam@eratvolutpat.org","Suspendisse sagittis. Nullam vitae diam.");
INSERT INTO alunos (nome,email,obs) VALUES ("Abbot Wolfe","et.euismod@urna.co.uk","nulla. intger vulputate, risus a ultricies adipiscing, enim");
INSERT INTO alunos (nome,email,obs) VALUES ("Whilemina Kerr","ante.Maecenas@metusAeneansed.ca","lobortis risus. In mi pede, nonummy ut, molestie in, tempus");
INSERT INTO alunos (nome,email,obs) VALUES ("Armando Y. Merritt","mauris@Praesent.net","Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec");
INSERT INTO alunos (nome,email,obs) VALUES ("Breanna H. Rasmussen","dictum.eu.eleifend@Donec.edu","rutrum lorem ac");
INSERT INTO alunos (nome,email,obs) VALUES ("Phyllis Sharpe","condimentum.Donec@metusurnaconvallis.ca","felis eget varius ultrices, mauris");
INSERT INTO alunos (nome,email,obs) VALUES ("Dylan Massey","velit.in@loremeget.ca","consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus");
INSERT INTO alunos (nome,email,obs) VALUES ("Christian E. Stewart","a.feugiat@consequatnec.net","massa. Vestibulum accumsan neque et nunc. Quisque ornare");
INSERT INTO alunos (nome,email,obs) VALUES ("Kaden Arnold","augue.malesuada.malesuada@fringillacursus.net","fames ac");
INSERT INTO alunos (nome,email,obs) VALUES ("Daphne Christensen","In.nec.orci@condimentum.net","arcu. Vivamus sit amet");
INSERT INTO alunos (nome,email,obs) VALUES ("Jamalia Ayers","vitae@luctus.com","egestas blandit. Nam nulla magna, malesuada vel, convallis in,");
INSERT INTO alunos (nome,email,obs) VALUES ("Kellie Contreras","dapibus@PraesentluctusCurabitur.ca","pede. Cras vulputate");
INSERT INTO alunos (nome,email,obs) VALUES ("Laurel Vasquez","Quisque.varius@acmattisornare.com","pede blandit congue. In scelerisque scelerisque dui. Suspendisse");
INSERT INTO alunos (nome,email,obs) VALUES ("Anastasia Y. Farrell","augue@aliquamenimnec.org","aliquet magna a neque. Nullam ut nisi a odio");
INSERT INTO alunos (nome,email,obs) VALUES ("Orlando Adams","in@pedeacurna.edu","Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut");
INSERT INTO alunos (nome,email,obs) VALUES ("Jamal U. Bentley","mus@venenatisamagna.com","Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede.");
INSERT INTO alunos (nome,email,obs) VALUES ("Christine Arnold","ornare.elit@risusMorbimetus.net","cursus et, magna. Praesent interdum ligula eu");
INSERT INTO alunos (nome,email,obs) VALUES ("Aline C. Mcclain","tristique.senectus@Maurisquisturpis.org","ligula. Nullam enim. Sed nulla ante,");
INSERT INTO alunos (nome,email,obs) VALUES ("Aphrodite Kelley","velit.Sed@Donecat.org","diam. Duis");
INSERT INTO alunos (nome,email,obs) VALUES ("Nerea Snider","tempus@varius.net","Phasellus dolor elit, pellentesque a, facilisis non, bibendum");
INSERT INTO alunos (nome,email,obs) VALUES ("Nelle Lindsay","conubia.nostra@magnaet.co.uk","elementum purus, accumsan interdum libero dui nec");
INSERT INTO alunos (nome,email,obs) VALUES ("Callum Q. Weaver","metus.eu.erat@utnisi.ca","mauris sagittis placerat.");
INSERT INTO alunos (nome,email,obs) VALUES ("Courtney Y. Davidson","cursus@sitametdiam.edu","metus urna convallis erat, eget tincidunt dui augue");
INSERT INTO alunos (nome,email,obs) VALUES ("Harding C. Woodard","orci@Cum.net","congue a, aliquet vel, vulputate eu, odio. Phasellus at");
INSERT INTO alunos (nome,email,obs) VALUES ("Zenaida Chang","Fusce.mi@nisi.co.uk","lobortis tellus justo sit amet nulla. Donec non");
INSERT INTO alunos (nome,email,obs) VALUES ("Curran Lott","quis@fringillaeuismod.co.uk","id");
INSERT INTO alunos (nome,email,obs) VALUES ("Ulysses Dominguez","neque.Nullam@acturpisegestas.org","Proin nisl sem, consequat nec, mollis vitae, posuere at, velit.");
INSERT INTO alunos (nome,email,obs) VALUES ("Abra Beard","nibh.Aliquam.ornare@seddictumeleifend.edu","egestas. Sed pharetra,");
INSERT INTO alunos (nome,email,obs) VALUES ("Travis S. Griffin","ac.urna.Ut@arcu.org","at, nisi. Cum sociis natoque penatibus et");
INSERT INTO alunos (nome,email,obs) VALUES ("Piper U. Flores","sem.semper.erat@magnaDuisdignissim.co.uk","Aliquam vulputate ullamcorper magna. Sed eu eros.");
INSERT INTO alunos (nome,email,obs) VALUES ("Bell Kemp","luctus.Curabitur@adipiscingfringilla.edu","penatibus et magnis");
INSERT INTO alunos (nome,email,obs) VALUES ("Bryar Hays","augue.porttitor.interdum@liberonec.org","non ante bibendum ullamcorper. Duis");
INSERT INTO alunos (nome,email,obs) VALUES ("Shay P. Jenkins","neque.Nullam@convallis.net","euismod urna. Nullam");
INSERT INTO alunos (nome,email,obs) VALUES ("Wyoming Stark","leo.Morbi@ultricesVivamus.org","Nulla aliquet. Proin velit. Sed malesuada augue ut lacus.");
INSERT INTO alunos (nome,email,obs) VALUES ("Quon Montoya","aliquet.libero@egestasSed.edu","nec quam. Curabitur");
INSERT INTO alunos (nome,email,obs) VALUES ("Sydney V. Glover","arcu.vel.quam@auctornon.co.uk","Curabitur egestas nunc sed libero. Proin sed turpis nec");
INSERT INTO alunos (nome,email,obs) VALUES ("Keely V. Mccormick","a.feugiat@aliquet.ca","a, auctor");
INSERT INTO alunos (nome,email,obs) VALUES ("Blake Pitts","eu.tellus@cursus.edu","euismod mauris eu elit. Nulla facilisi.");
INSERT INTO alunos (nome,email,obs) VALUES ("Beau R. Wood","lacus@montesnascetur.com","euismod in, dolor. Fusce");
INSERT INTO alunos (nome,email,obs) VALUES ("Shellie Singleton","lectus@loremeget.net","luctus et ultrices posuere cubilia");
INSERT INTO alunos (nome,email,obs) VALUES ("Bertha Ochoa","lorem@blandit.org","volutpat ornare, facilisis eget, ipsum.");
INSERT INTO alunos (nome,email,obs) VALUES ("Eleanor Houston","sem.elit.pharetra@tempusloremfringilla.edu","et malesuada fames ac turpis egestas.");
INSERT INTO alunos (nome,email,obs) VALUES ("Austin Gilbert","luctus.aliquet.odio@vellectusCum.ca","ac mattis semper, dui");
INSERT INTO alunos (nome,email,obs) VALUES ("Iona Molina","ipsum.sodales@Fuscealiquet.org","pede, malesuada vel, venenatis vel, faucibus id,");
INSERT INTO alunos (nome,email,obs) VALUES ("Amber D. Hansen","vitae.aliquam.eros@ut.net","fringilla mi");
INSERT INTO alunos (nome,email,obs) VALUES ("Sebastian D. Booker","gravida@Uttincidunt.net","sem");
INSERT INTO alunos (nome,email,obs) VALUES ("Adam X. Gates","quis.urna.Nunc@consequat.co.uk","blandit mattis. Cras eget");
INSERT INTO alunos (nome,email,obs) VALUES ("Lydia O. Walter","ut@Duisvolutpatnunc.edu","adipiscing ligula. Aenean gravida nunc");
INSERT INTO alunos (nome,email,obs) VALUES ("Ocean H. Faulkner","sed@sitamet.net","augue");
INSERT INTO alunos (nome,email,obs) VALUES ("Cailin Dixon","auctor@in.edu","mauris. intger sem elit, pharetra ut, pharetra sed, hendrerit");
INSERT INTO alunos (nome,email,obs) VALUES ("Michael K. Rasmussen","lobortis@lobortisrisus.edu","eget, dictum placerat, augue. Sed molestie.");
INSERT INTO alunos (nome,email,obs) VALUES ("Shaine K. Lamb","Donec@odiotristique.edu","tristique pharetra. Quisque ac libero nec ligula");
INSERT INTO alunos (nome,email,obs) VALUES ("Donna Q. Wells","eu.arcu.Morbi@pede.org","enim commodo hendrerit. Donec porttitor tellus");
INSERT INTO alunos (nome,email,obs) VALUES ("Olivia Delgado","scelerisque.scelerisque.dui@aliquetnecimperdiet.com","ullamcorper. Duis");
INSERT INTO alunos (nome,email,obs) VALUES ("Jaquelyn Alexander","mus.Proin@milacinia.ca","Duis");
INSERT INTO alunos (nome,email,obs) VALUES ("Lara Shields","egestas@Quisquepurus.net","Phasellus elit pede, malesuada vel, venenatis");
INSERT INTO alunos (nome,email,obs) VALUES ("Carlos Bonner","eu.eros.Nam@quam.org","Sed auctor odio a purus.");
INSERT INTO alunos (nome,email,obs) VALUES ("Kay J. Rosales","dolor.sit.amet@eget.co.uk","odio sagittis semper. Nam tempor diam dictum sapien.");
INSERT INTO alunos (nome,email,obs) VALUES ("Tasha Moss","semper.egestas@arcu.edu","aliquet lobortis, nisi");
INSERT INTO alunos (nome,email,obs) VALUES ("Faith Y. Norris","nec.leo@orciconsectetuer.com","leo. Cras vehicula aliquet libero. intger");
INSERT INTO alunos (nome,email,obs) VALUES ("Kato C. Bradshaw","est.mollis@gravida.ca","massa non ante bibendum ullamcorper. Duis cursus, diam at pretium");
INSERT INTO alunos (nome,email,obs) VALUES ("Elaine Bridges","ante.iaculis@rhoncus.net","lobortis tellus justo sit amet nulla. Donec non justo.");
INSERT INTO alunos (nome,email,obs) VALUES ("Charlotte Bryan","pede.Praesent@eu.com","Cras dolor dolor, tempus non, lacinia at, iaculis");
INSERT INTO alunos (nome,email,obs) VALUES ("Jordan X. Sanders","Mauris@etipsumcursus.edu","a, auctor non, feugiat nec, diam. Duis mi enim,");
INSERT INTO alunos (nome,email,obs) VALUES ("Tate L. Clark","ornare@tortorat.co.uk","Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu");
INSERT INTO alunos (nome,email,obs) VALUES ("Idola I. Little","fermentum.metus.Aenean@magnaSuspendissetristique.net","ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet,");
INSERT INTO alunos (nome,email,obs) VALUES ("Lacey L. Ramos","a.dui@a.edu","in");
INSERT INTO alunos (nome,email,obs) VALUES ("Lucian Hogan","lectus@accumsannequeet.org","sit");
INSERT INTO alunos (nome,email,obs) VALUES ("Ryan Conner","ullamcorper@Nullamfeugiatplacerat.com","lorem semper auctor. Mauris vel turpis. Aliquam");
INSERT INTO alunos (nome,email,obs) VALUES ("Ruth Z. Brady","arcu.Vestibulum@convallisantelectus.co.uk","malesuada vel, convallis in, cursus et,");
INSERT INTO alunos (nome,email,obs) VALUES ("Shellie Lancaster","sit@congueturpis.ca","In scelerisque scelerisque dui.");
INSERT INTO alunos (nome,email,obs) VALUES ("Nolan Ward","nisl.elementum@liberoProin.ca","eros nec tellus. Nunc lectus pede, ultrices");
INSERT INTO alunos (nome,email,obs) VALUES ("Tashya Potter","augue@Nulla.co.uk","est,");
INSERT INTO alunos (nome,email,obs) VALUES ("Deacon V. Owens","Nullam@mauris.com","porttitor eros");
INSERT INTO alunos (nome,email,obs) VALUES ("Lawrence Atkinson","odio.Nam.interdum@inceptos.co.uk","varius orci, in consequat enim diam vel");
INSERT INTO alunos (nome,email,obs) VALUES ("Cade Burton","nulla.intger.vulputate@malesuadautsem.net","sem semper");
INSERT INTO alunos (nome,email,obs) VALUES ("Cain L. Figueroa","et@felis.net","nec tellus. Nunc lectus pede, ultrices");
INSERT INTO alunos (nome,email,obs) VALUES ("Brody Howard","luctus.et.ultrices@apurus.com","molestie tellus. Aenean egestas hendrerit");
INSERT INTO alunos (nome,email,obs) VALUES ("Pamela B. Finch","facilisis@diamluctuslobortis.org","lorem");
INSERT INTO alunos (nome,email,obs) VALUES ("Denise Vargas","est@arcuVivamus.ca","lobortis augue scelerisque mollis.");
INSERT INTO alunos (nome,email,obs) VALUES ("Yoshio King","cursus@sapienAeneanmassa.co.uk","eget metus eu erat");
INSERT INTO alunos (nome,email,obs) VALUES ("Quintessa Booker","blandit.enim@nuncinterdumfeugiat.com","Sed neque. Sed eget");
INSERT INTO alunos (nome,email,obs) VALUES ("Patrick F. Christensen","luctus.sit.amet@Proin.ca","vitae velit egestas lacinia. Sed congue, elit sed");
INSERT INTO alunos (nome,email,obs) VALUES ("Indira N. Camacho","imperdiet.erat@necmetus.org","senectus et");
INSERT INTO alunos (nome,email,obs) VALUES ("Jeremy Key","dolor.quam@volutpatNulladignissim.ca","intger vulputate, risus a ultricies adipiscing,");
INSERT INTO alunos (nome,email,obs) VALUES ("Norman Hopper","vitae@eteuismodet.net","diam lorem, auctor quis, tristique ac, eleifend vitae,");
INSERT INTO alunos (nome,email,obs) VALUES ("Ariana Collier","Suspendisse.dui.Fusce@dolorQuisque.com","augue eu tellus. Phasellus elit pede, malesuada vel,");
INSERT INTO alunos (nome,email,obs) VALUES ("Brendan W. Jennings","libero@feugiatLorem.edu","urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus");
INSERT INTO alunos (nome,email,obs) VALUES ("Hedda B. Perry","Phasellus@lorem.org","tellus, imperdiet non, vestibulum nec, euismod");
INSERT INTO alunos (nome,email,obs) VALUES ("Bell Keller","volutpat.ornare.facilisis@Donecnonjusto.net","metus. Vivamus euismod urna.");

SELECT nome, obs FROM alunos WHERE MATCH(nome, obs) AGAINST ('Jordan Sanders feugiat');

SELECT nome, MATCH(nome, obs) AGAINST ('Jordan Sanders feugiat') FROM alunos ORDER BY MATCH(nome, obs) AGAINST ('Jordan Sanders feugiat') DESC;

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario
(
	id        INT(11) AUTO_INCREMENT,
	nome      VARCHAR(255),
	email     VARCHAR(255),
	senha     VARCHAR(255),
	PRIMARY KEY (id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS atividade;
CREATE TABLE atividade
(
	id INT(11) AUTO_INCREMENT,
	idUsuario  INT(11),
	dataHora   TIMESTAMP,
	PRIMARY KEY (id)
)ENGINE=InnoDB;

DROP PROCEDURE IF EXISTS insereUsuario;

DELIMITER $$  
CREATE PROCEDURE insereUsuario(qtd INT)
BEGIN
	DECLARE v_limite INT DEFAULT qtd;
	DECLARE v_contador INT DEFAULT 0;
	START TRANSACTION;
		WHILE v_contador < v_limite DO
	    	INSERT INTO usuario (nome, email, senha) 
	    		VALUES 
	    			(
	    			CONCAT ('nomedocara', FLOOR((RAND() * v_limite))),
	    			CONCAT ('emaildocara','@' , FLOOR((RAND() * v_limite)), '.com.br'),
	    			CONCAT ('senhadocara', MD5(RAND()))
	    			 );
	    	SET v_contador = v_contador + 1;
		END WHILE;
	COMMIT;
END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS insereatividade;

DELIMITER $$  
CREATE PROCEDURE insereAtividade(qtd INT)
BEGIN
	DECLARE v_limite INT DEFAULT qtd;
	DECLARE v_contador INT DEFAULT 0;
    SELECT MAX(id) INTO @v_limite FROM usuario;
	START TRANSACTION;
		WHILE v_contador < v_limite DO
	    	INSERT INTO atividade (idUsuario) 
	    		VALUES 
	    			(1+RAND()*v_limite);
	    	SET v_contador = v_contador + 1;
		END WHILE;
	COMMIT;
END $$

DELIMITER ;

CALL insereUsuario(1000000);
CALL insereAtividade(1000000);

mysqlslap --user=root --password --host=localhost  --concurrency=88 --iterations=100 --create-schema=aula11 --query="SELECT * FROM cliente;"

mysqlslap --concurrency=8 --iterations=100 --number-int-cols=2 --number-char-cols=3 --auto-generate-sql

mysqlslap --user=root --password=senacrs --delimiter=";" --create="CREATE TABLE a (b int);INSERT INTO a VALUES (23)" --query="SELECT count(*) FROM a" --concurrency=5 --iterations=200



SELECT COUNT(*) 
FROM usuario 
WHERE email = 'emaildocara@591939.com.br';

SELECT COUNT(*) 
FROM usuario 
WHERE nome = 'nomedocara189970';

ALTER TABLE usuario ADD INDEX idxEmail (email);

SELECT COUNT(*) 
FROM usuario 
WHERE email = 'emaildocara@591939.com.br';

