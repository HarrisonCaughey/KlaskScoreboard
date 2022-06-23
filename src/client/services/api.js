import axios from 'axios';

const serverPath = 'http://localhost:3001'

export function getGames() {
    return axios.get(`${serverPath}/api/games`).then((games) => {
        return games;
    }).catch((err) => {
        console.error(err);
    })
}