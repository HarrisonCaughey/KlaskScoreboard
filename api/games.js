const {db} = require('libs/database');

module.exports = async (req, res) => {
    console.log("serverless games function hit")
    let games = await db.select('Game.id', 'Game.date_played', 'Game.player_one', 'Game.player_two', 'Game.score', 'Game.player_one_win', 'Player.name as p1_name', 'Player2.name as p2_name')
            .from('Game')
            .leftJoin('Player', 'Game.player_one', 'Player.id')
            .leftJoin('Player as Player2', 'Game.player_two', 'Player2.id')
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.log(err);
            });

            console.log(games)
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(games);
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