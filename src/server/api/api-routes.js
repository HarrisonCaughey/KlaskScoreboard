const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// function getAllGames() {
//     db.select('*')
//             .from('games')
//             .then((data) => {
//                 console.log(data);
//                 res.json(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     res.status(200).send('Getting games?')
// })

export default app;
