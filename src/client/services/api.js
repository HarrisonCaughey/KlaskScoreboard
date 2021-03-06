import axios from 'axios';

const serverPath = process.env.NODE_ENV !== 'development' ? "https://klask-scoreboard.vercel.app" : 'http://localhost:3001';

export function getGames() {
    return axios.get(`${serverPath}/api/games`).then((games) => {
        console.log(games)
        return games;
    }).catch((err) => {
        console.error(err);
    })
}

export function saveGame(game) {
    return axios.post(`${serverPath}/api/games`, {game: game})
        .catch((err) => {
            console.error(err);
        })
}

export function getPlayers() {
    return axios.get(`${serverPath}/api/players`).then((players) => {
        return players;
    }).catch((err) => {
        console.error(err);
    })
}

export function updatePlayer(player, id) {
    return axios.put(`${serverPath}/api/players`, {player: player, id: id})
            .catch((err) => {
                console.error(err);
            })
}