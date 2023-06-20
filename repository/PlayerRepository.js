'use strict';


const Repository = require('./Repository');


module.exports = class PlayerRepository extends Repository {

    constructor(fastify) {
        super(fastify);
    }

    async get() {

        try {

            const SQL = '\
                SELECT * \
                FROM players \
                ORDER BY player::jsonb#>\'{data,rank}\'; \
            ';

            return await this.db.query(SQL);

        } catch(err) {
            this.log.error(err);
            throw err;
        }
    }

    async getOne(id) {

        try {

            const SQL = '\
                SELECT * \
                FROM players \
                WHERE id = $1; \
            ';

            return await this.db.query(SQL, [ id ]);

        } catch(err) {
            this.log.error(err);
            throw err;
        }
    }

    async kpis() {

        try {

            const SQL = '\
                SELECT json_build_object( \
                    \'maxPointRatioPerCountry\', \
                    obj.max, \
                    \'medianBodyHeight\', \
                    obj.median, \
                    \'imcs\', \
                    obj.imcs \
                ) AS kpis \
                FROM ( \
                    SELECT ( \
                        SELECT json_build_object(\'country\', rrr.country, \'points\', rrr.ratio) \
                        FROM ( \
                            SELECT \
                                rr.country::text, \
                                max(rr.ratio) AS ratio \
                            FROM ( \
                                SELECT \
                                    r.country AS country, \
                                    avg(r.points::integer) AS ratio \
                                FROM ( \
                                    SELECT \
                                        player::jsonb#>\'{data,points}\' AS points, \
                                        player::jsonb#>>\'{country,code}\' AS country \
                                    FROM players \
                                ) r \
                                GROUP BY 1 \
                            ) rr \
                            GROUP BY 1 \
                            ORDER BY 2 DESC \
                            LIMIT 1 \
                        ) rrr \
                    ) AS max, \
                    ( \
                        SELECT \
                            percentile_cont(0.5) \
                        WITHIN GROUP(ORDER BY mm.height) \
                        FROM ( \
                            SELECT \
                                m.height::float AS height  \
                                FROM ( \
                                SELECT \
                                    player::jsonb#>\'{data,height}\' AS height \
                                FROM players \
                            ) m \
                        ) mm \
                    ) AS median, \
                    ( \
                        SELECT \
                            jsonb_agg(ii.*) \
                        FROM ( \
                            SELECT \
                                i.id, \
                                i.firstname, \
                                i.lastname, \
                                (i.weight::float / 1000) / ((i.height::float / 100)^2) AS imc \
                            FROM ( \
                                SELECT \
                                    player::jsonb->\'id\' AS id, \
                                    player::jsonb->\'firstname\' AS firstname, \
                                    player::jsonb->\'lastname\' AS lastname,  \
                                    player::jsonb#>\'{data,weight}\' AS weight, \
                                    player::jsonb#>\'{data,height}\' AS height \
                                FROM players \
                            ) i \
                        ) ii \
                    ) AS imcs \
                ) obj; \
            ';

            return await this.db.query(SQL);

        } catch(err) {
            this.log.error(err);
            throw err;
        }
    }
};
