import pool from "../config/db.js";

const userModel = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM users');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
        return res.rows;
    },
    create: async (entry) => {
        const { name, email, password } = entry;
        const res = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [name, email, password]);
        return res.rows;
    },
    update: async (id, entry) => {
        const { name, email, password } = entry;
        const res = await pool.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
            [name, email, password, id]
        );
        return res.rows;
    },
    remove: async (id) => {
        const res = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
        return res.rows;
    },
};

export default userModel;