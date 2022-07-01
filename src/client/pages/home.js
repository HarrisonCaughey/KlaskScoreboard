import React from "react";
import {Form} from "react-bootstrap";
import {getGames, getPlayers} from "../services/api";
import { DataGrid } from '@mui/x-data-grid';


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            players: null,
            columns: [
                { field: 'players', headerName: 'Players', width: 200, sortable: false },
                { field: 'winner', headerName: 'Winner', width: 120 },
                { field: 'rounds', headerName: 'Rounds', width: 80 },
                { field: 'formattedScore', headerName: 'Score', width: 200, sortable: false },
                { field: 'formattedDate', headerName: 'Date', width: 200 }
            ]
        }
    }

    componentDidMount() {
        getPlayers().then((players) => {
            this.setState({ players: players.data });
            getGames().then(games => {
                games = games.data;
                for (let i = 0; i < games.length; i++) {
                    games[i].players = `${games[i].p1_name} vs. ${games[i].p2_name}`
                    games[i].winner = games[i].player_one_win ? games[i].p1_name : games[i].p2_name;
                    games[i].rounds = games[i].score.length;
                    games[i].formattedScore = games[i].score.map(round => " " + round);
                    games[i].formattedDate = games[i].date_played.slice(0, 10) + " " + games[i].date_played.slice(11, 19);
                }
                this.setState({ games: games });
            })
        })

    }

    render() {
        return (
                <div>
                    <Form style={{padding: 100}}>
                        <Form.Label>Game History:</Form.Label>
                        {   this.state.games && this.state.games.length !== 0 ?
                            <div style={{height: 400, width: '100%'}}>
                            <DataGrid
                                    rows={this.state.games}
                                    columns={this.state.columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                            />
                        </div> : null}
                    </Form>
                </div>
        )
    }
}