const {db} = require('../libs/database');

async function players(req, res) {
    console.log("api/players endpoint hit in serverless function")
    if (req.method === 'GET') {
        // call get method
        try {
            let games = await getPlayers();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
            res.json(games);
            res.send(games);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    } else if (req.method === 'PUT') {
        // call post method
        try {
            let player = req.body.player;
            let id = req.body.id
            await putPlayer(player, id);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(400).send("Method not allowed");
    }
}

async function getPlayers() {
    return db.select('*')
            .from('Player')
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((err) => {
                console.log(err);
            });
}

async function putPlayer(player, id) {
    return db('Player').where({id: id}).update(player).then((data) => {
        console.log(data)
        return data
    }).catch((err) => {
        console.log(err)
    })
}

export default players;