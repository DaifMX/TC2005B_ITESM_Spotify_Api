import pool from "../config/db.js";

const favoriteModel = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM favorites');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query(`SELECT * FROM favorites WHERE id = ${id}`);
        return res.rows;
    },
    create: async (entry) => {
        const {user_id, items} = entry;
        const res = await pool.query(`INSERT INTO favorites (user_id, items) VALUES ($1, $2) RETURNING *`,
            [user_id, items]);
        return res.rows;
    },
    update: async (id, entry) => {
        const { user_id, items } = entry;
        const res = await pool.query(`UPDATE favorites SET user_id = $1, items = $2 WHERE id = $3 RETURNING *`,
            [user_id, items, id]
        );
        return res.rows;
    },
    remove: async (id) => {
        const res = await pool.query(`DELETE FROM favorites WHERE id = $1`, [id]);
        return res.rows;
    }
};

export default favoriteModel;