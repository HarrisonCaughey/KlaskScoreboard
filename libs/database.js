const {Pool} = require('pg');
const knex = require('knex');
require('dotenv').config();
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port: 5432
    },
});

// const pool = new Pool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE,
//     port: 5432,
//     // About a week
//     idleTimeoutMillis: 604800000
// })
//
// await pool.connect();

module.exports = db;
