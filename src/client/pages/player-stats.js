import React from "react";
import {Form} from "react-bootstrap";
import {getGames, getPlayers} from "../services/api";
import { DataGrid } from '@mui/x-data-grid';


export class PlayerStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            players: null,
            columns: [
                { field: 'name', headerName: 'Name', width: 150 },
                { field: 'wlr', headerName: 'Win/Loss Ration', width: 150 },
                { field: 'games_won', headerName: 'Wins', width: 100 },
                { field: 'games_lost', headerName: 'Losses', width: 100 },
                { field: 'games_played', headerName: 'Games Played', width: 140 },
                { field: 'points_won', headerName: 'Points Won', width: 100 }
            ]
        }
    }

    componentDidMount() {
        getPlayers().then((players) => {
            for (let i = 0; i < players.data.length; i++) {
                players.data[i].games_played = players.data[i].games_won + players.data[i].games_lost;
                players.data[i].wlr = this.getWinLossRational(players.data[i]);
            }
            this.setState({ players: players.data });
        })

    }

    getWinLossRational(player) {
        let wlr = 0
        let won = player.games_won
        let lost = player.games_lost
        if (won === 0) {
            return wlr;
        }
        try {
            wlr = (100 * won) / (won + lost)
            return `${wlr.toFixed(2)}%`
        } catch (e) {
            console.log(e)
            return "100%"
        }
    }

    render() {
        return (
                <div>
                    <Form style={{padding: 100}}>
                        <Form.Label>Game History:</Form.Label>
                        {   this.state.players && this.state.players.length !== 0 ?
                                <div style={{height: 400, width: '100%'}}>
                                    <DataGrid
                                            rows={this.state.players}
                                            columns={this.state.columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            initialState={{
                                                sorting: {
                                                    sortModel: [{ field: 'wlr', sort: 'desc' }],
                                                },
                                            }}
                                    />
                                </div> : null}
                    </Form>
                </div>
        )
    }
}