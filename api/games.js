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

async function games(req, res) {
    console.log("api/games endpoint hit in serverless function")
    console.log(db)
    if (req.method === 'GET') {
        // call get method
        try {
            console.log("getting games")
            let games = await getGames();
            console.log(games)
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(games);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    } else if (req.method === 'POST') {
        // call post method
        try {
            let game = req.body.game;
            await postGame(game);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(400).send("Method not allowed");
    }
}

async function getGames() {
    console.log("Getting games")
    return db.select('Game.id', 'Game.date_played', 'Game.player_one', 'Game.player_two', 'Game.score', 'Game.player_one_win', 'Player.name as p1_name', 'Player2.name as p2_name')
            .from('Game')
            .leftJoin('Player', 'Game.player_one', 'Player.id')
            .leftJoin('Player as Player2', 'Game.player_two', 'Player2.id')
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.log(err);
            });
}

async function postGame(game) {
    console.log("Posting game:");
    console.log(game)
    db('Game').insert(
            {player_one: game.player_one,
                player_two: game.player_two,
                player_one_win: game.player_one_win,
                score: game.score,
                date_played: game.date_played,
            })
            .catch((err) => {
                console.log(err);
            });
}

export default games;