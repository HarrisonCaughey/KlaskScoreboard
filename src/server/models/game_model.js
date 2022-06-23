const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Klask',
    password: 'Squab171',
    port: 6432
});

const getGames = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM Games', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
        })
    })
}