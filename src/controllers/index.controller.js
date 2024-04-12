const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');

const pool = new Pool({
    host: 'localhost',
    port: 5432, 
    database: 'test_brk',
    user: 'postgres',
    password: 'Myanabeth0'
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, response) => {
        if(error) {
            throw error;
        }
        res.status(200).json(response.rows);
    });
}

module.exports = {
    getUsers
}