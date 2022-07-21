const {db} = require('../libs/database');

async function games(req, res) {
    console.log("api/games endpoint hit in serverless function")
    console.log(db)
    console.log(await db.query("SELECT * from games;"))
    if (req.method === 'GET') {
        // call get method
        try {
            let games = await getGames();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
            res.json(games);
            res.send(games);
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