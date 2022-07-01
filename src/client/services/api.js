import axios from 'axios';

const serverPath = 'http://localhost:3001'

export function getGames() {
    return axios.get(`${serverPath}/api/games`).then((games) => {
        return games;
    }).catch((err) => {
        console.error(err);
    })
}

export function saveGame(game) {
    console.log(`doing axios.post in api.saveGame()`)
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