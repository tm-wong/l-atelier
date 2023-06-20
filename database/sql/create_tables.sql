BEGIN;

-- TEST
DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table (
	id serial NOT NULL PRIMARY KEY,
	name text NOT NULL
);

INSERT INTO test_table
(name)
VALUES
('hello database');


-- PLAYER ENTITY
DROP TABLE IF EXISTS players;

CREATE TABLE players (
	id serial NOT NULL PRIMARY KEY,
	player jsonb NOT NULL
);

INSERT INTO players
(id, player)
VALUES
(52, '{"id":52,"firstname":"Novak","lastname":"Djokovic","shortname":"N.DJO","sex":"M","country":{"picture":"https://data.latelier.co/training/tennis_stats/resources/Serbie.png","code":"SRB"},"picture":"https://data.latelier.co/training/tennis_stats/resources/Djokovic.png","data":{"rank":2,"points":2542,"weight":80000,"height":188,"age":31,"last":[1,1,1,1,1]}}'),
(95, '{"id":95,"firstname":"Venus","lastname":"Williams","shortname":"V.WIL","sex":"F","country":{"picture":"https://data.latelier.co/training/tennis_stats/resources/USA.png","code":"USA"},"picture":"https://data.latelier.co/training/tennis_stats/resources/Venus.webp","data":{"rank":52,"points":1105,"weight":74000,"height":185,"age":38,"last":[0,1,0,0,1]}}'),
(65, '{"id":65,"firstname":"Stan","lastname":"Wawrinka","shortname":"S.WAW","sex":"M","country":{"picture":"https://data.latelier.co/training/tennis_stats/resources/Suisse.png","code":"SUI"},"picture":"https://data.latelier.co/training/tennis_stats/resources/Wawrinka.png","data":{"rank":21,"points":1784,"weight":81000,"height":183,"age":33,"last":[1,1,1,0,1]}}'),
(10, '{"id":102,"firstname":"Serena","lastname":"Williams","shortname":"S.WIL","sex":"F","country":{"picture":"https://data.latelier.co/training/tennis_stats/resources/USA.png","code":"USA"},"picture":"https://data.latelier.co/training/tennis_stats/resources/Serena.png","data":{"rank":10,"points":3521,"weight":72000,"height":175,"age":37,"last":[0,1,1,1,0]}}'),
(17, '{"id":17,"firstname":"Rafael","lastname":"Nadal","shortname":"R.NAD","sex":"M","country":{"picture":"https://data.latelier.co/training/tennis_stats/resources/Espagne.png","code":"ESP"},"picture":"https://data.latelier.co/training/tennis_stats/resources/Nadal.png","data":{"rank":1,"points":1982,"weight":85000,"height":185,"age":33,"last":[1,0,0,0,1]}}');


COMMIT;
