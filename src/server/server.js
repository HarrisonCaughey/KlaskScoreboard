const express = require('express')
const cors = require("cors");
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

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/api/games', (req, res) => {
    db.select('*')
            .from('game')
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
})

app.put('/api/games', (req, res) => {
    console.log(req.data)
    db.insert(req.data)
            .into('game')
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})








// const cors = require('cors');
// const bodyParser = require('body-parser');
// const http = require('http');
// const apiRoutes = require('./api/api-routes')
// // import bodyParser from 'body-parser';
// // import http from 'http';
// // import apiRoutes from './api/api-routes';
// // import path from 'path';
// // import "./init/initialise";
//
// // Constants
// const PORT = 3001;
// const express = require('express');
// const path = require("path");
//
// // App
// const app = express();
// app.use(bodyParser.json());
//
// if (process.env.ENABLE_CORS === 'true') {
//     console.log("Enabling cors")
//     app.use(cors({
//         origin: 'http://admin.lsd.test', optionsSuccessStatus: 200
//     }));
// }
//
// const server = http.createServer(app);
//
// app.use('/api', apiRoutes);
//
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });
//
// server.listen(PORT, '0.0.0.0', function listening() {
//     console.log('Running on http://localhost:%d', server.address().port);
// });
//
