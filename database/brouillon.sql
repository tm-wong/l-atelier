                SELECT * \
                FROM players \
                ORDER BY player::jsonb#>\'{data,rank}\'; \


Créer un endpoint qui retourne les statistiques suivantes :

- Pays qui a le plus grand ratio de parties gagnées

- IMC moyen de tous les joueurs

- La médiane de la taille des joueurs

SELECT 
	sum(player::jsonb#>'{data,points}') AS points,
	player::jsonb#>>'{country,code}' AS country
FROM players
GROUP BY country;


select date, json_object_agg(key, val)
from (
    select date, key, sum(value::numeric) val
    from mytable t, jsonb_each_text(star_pu)
    group by date, key
    ) s
group by date;

WITH
  keys AS (SELECT DISTINCT jsonb_object_keys(star_pu) AS key FROM mytable),
  sums AS (SELECT key, sum((star_pu->>key)::float) AS total FROM keys, mytable GROUP BY key)
  SELECT json_object(array_agg(key), array_agg(total::text))::jsonb FROM sums


postgres=# SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY sale) FROM sales;


-- median height
SELECT
	percentile_cont(0.5)
WITHIN GROUP(ORDER BY nb.height)
FROM (
	SELECT
		d.id,
		d.firstname,
		d.lastname,
		d.height::float AS height 
		FROM (
		SELECT
			player::jsonb->'id' AS id,
			player::jsonb->'firstname' AS firstname,
			player::jsonb->'lastname' AS lastname, 
			player::jsonb#>'{data,height}' AS height
		FROM players
	) d
) nb;

-- SELECT
-- 	percentile_disc(0.5)
-- WITHIN GROUP(ORDER BY nb.height)
-- FROM (
-- 	SELECT
-- 		d.id,
-- 		d.firstname,
-- 		d.lastname,
-- 		d.height::float AS height 
-- 		FROM (
-- 		SELECT
-- 			player::jsonb->'id' AS id,
-- 			player::jsonb->'firstname' AS firstname,
-- 			player::jsonb->'lastname' AS lastname, 
-- 			player::jsonb#>'{data,height}' AS height
-- 		FROM players
-- 	) d
-- ) nb;


-- imc
SELECT
	d.id,
	d.firstname,
	d.lastname,
	(d.weight::float / 1000) / ((d.height::float / 100)^2) AS imc
FROM (
	SELECT
		player::jsonb->'id' AS id,
		player::jsonb->'firstname' AS firstname,
		player::jsonb->'lastname' AS lastname, 
		player::jsonb#>'{data,weight}' AS weight,
		player::jsonb#>'{data,height}' AS height
	FROM players
) d;


 sex | weight | height 
-----+--------+--------
 "M" | 80000  | 188
 "F" | 74000  | 185
 "M" | 81000  | 183
 "F" | 72000  | 175
 "M" | 85000  | 185
(5 rows)

	
-- max points
SELECT
	sum(d.points::integer) AS points,
	d.country
FROM (
	SELECT 
		player::jsonb#>'{data,points}' AS points,
		player::jsonb#>>'{country,code}' AS country
	FROM players
) d
GROUP BY 2
ORDER BY 1 DESC
LIMIT 1;


SELECT
	sum(d.points::integer) AS points,
	d.country
FROM (
	SELECT 
		player::jsonb#>'{data,points}' AS points,
		player::jsonb#>>'{country,code}' AS country
	FROM players
) d
GROUP BY 2
ORDER BY 1 DESC
LIMIT 1;


SELECT
	dd.country,
	max(dd.ratio) AS ratio
FROM (
	SELECT
		d.country AS country,
		avg(d.points::integer) AS ratio
	FROM (
		SELECT
			player::jsonb#>'{data,points}' AS points,
			player::jsonb#>>'{country,code}' AS country
		FROM players
	) d
	GROUP BY 1
) dd
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1



SELECT
	rrr.country
FROM (
	SELECT
		rr.country,
		max(rr.ratio) AS ratio
	FROM (
		SELECT
			r.country AS country,
			avg(r.points::integer) AS ratio
		FROM (
			SELECT
				player::jsonb#>'{data,points}' AS points,
				player::jsonb#>>'{country,code}' AS country
			FROM players
		) r
		GROUP BY 1
	) rr
	GROUP BY 1
	ORDER BY 2 DESC
	LIMIT 1
) rrr
JOIN (
	SELECT
		i.id,
		i.firstname,
		i.lastname,
		(i.weight::float / 1000) / ((i.height::float / 100)^2) AS imc
	FROM (
		SELECT
			player::jsonb->'id' AS id,
			player::jsonb->'firstname' AS firstname,
			player::jsonb->'lastname' AS lastname, 
			player::jsonb#>'{data,weight}' AS weight,
			player::jsonb#>'{data,height}' AS height
		FROM players
	) i
) iii
ON true
JOIN (
	SELECT
		percentile_cont(0.5)
	WITHIN GROUP(ORDER BY mm.height)
	FROM (
		SELECT
			m.id,
			m.firstname,
			m.lastname,
			m.height::float AS height 
			FROM (
			SELECT
				player::jsonb->'id' AS id,
				player::jsonb->'firstname' AS firstname,
				player::jsonb->'lastname' AS lastname, 
				player::jsonb#>'{data,height}' AS height
			FROM players
		) m
	) mm
) mmm
ON true;


SELECT json_build_object(
	'maxPointRatioPerCountry',
	data.max
) FROM (
	SELECT (
		SELECT json_build_object('country', rrr.country, 'points', rrr.ratio) AS max
		FROM (
			SELECT
				rr.country::text,
				max(rr.ratio) AS ratio
			FROM (
				SELECT
					r.country AS country,
					avg(r.points::integer) AS ratio
				FROM (
					SELECT
						player::jsonb#>'{data,points}' AS points,
						player::jsonb#>>'{country,code}' AS country
					FROM players
				) r
				GROUP BY 1
			) rr
			GROUP BY 1
			ORDER BY 2 DESC
			LIMIT 1
		) rrr
	)
) data;


SELECT
	json_build_object('medianBodyHeight', mmm.percentile_cont)
FROM (
	SELECT
		percentile_cont(0.5)
	WITHIN GROUP(ORDER BY mm.height)
	FROM (
		SELECT
			m.height::float AS height 
			FROM (
			SELECT
				player::jsonb#>'{data,height}' AS height
			FROM players
		) m
	) mm
) mmm;

SELECT
	jsonb_agg(ii.*)
FROM (
	SELECT
		i.id,
		i.firstname,
		i.lastname,
		(i.weight::float / 1000) / ((i.height::float / 100)^2) AS imc
	FROM (
		SELECT
			player::jsonb->'id' AS id,
			player::jsonb->'firstname' AS firstname,
			player::jsonb->'lastname' AS lastname, 
			player::jsonb#>'{data,weight}' AS weight,
			player::jsonb#>'{data,height}' AS height
		FROM players
	) i
) ii;