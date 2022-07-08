import React from "react";
import {getPlayers} from "../services/api";
import { DataGrid } from '@mui/x-data-grid';


export class PlayerStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            players: null,
            columns: [
                { field: 'name', headerName: 'Name', width: 150 },
                {
                    field: 'wlr',
                    headerName: 'Win/Loss Ratio',
                    width: 150,
                    valueGetter: (params) =>
                            `${this.getWinLossRational(params.row.games_won, params.row.games_lost)}%`,
                    sortComparator: this.percentageComparator,
                },
                {
                    field: 'round_wlr',
                    headerName: 'Rounds WLR',
                    width: 150,
                    valueGetter: (params) =>
                            `${this.getWinLossRational(params.row.rounds_won, params.row.rounds_lost)}%`,
                    sortComparator: this.percentageComparator,
                },
                {
                    field: 'point_wlr',
                    headerName: 'Points WLR',
                    width: 150,
                    valueGetter: (params) =>
                            `${this.getWinLossRational(params.row.points_won, params.row.points_lost)}%`,
                    sortComparator: this.percentageComparator,
                },
                { field: 'games_won', headerName: 'Wins', width: 100 },
                { field: 'games_lost', headerName: 'Losses', width: 100 },
                {
                    field: 'games_played',
                    headerName: 'Games Played',
                    width: 140,
                    valueGetter: (params) => params.row.games_won + params.row.games_lost
                },
                { field: 'points_won', headerName: 'Points Won', width: 100 },
                { field: 'points_lost', headerName: 'Points Lost', width: 100 },
                { field: 'rounds_won', headerName: 'Rounds Won', width: 100 },
                { field: 'rounds_lost', headerName: 'Rounds Lost', width: 100 },
            ]
        }
    }

    percentageComparator = (v1, v2) => parseInt(v1.split('.')[0]) - parseInt(v2.split('.')[0])

    componentDidMount() {
        getPlayers().then((players) => {
            this.setState({ players: players.data });
        })

    }

    getWinLossRational(won, lost) {
        let wlr = 0
        if (won !== 0) {
            wlr = (100 * won) / (won + lost)
        }
        return wlr.toFixed(2)
    }

    render() {
        return (
                <div style={{padding: 100}}>
                        {   this.state.players && this.state.players.length !== 0 ?
                                <div style={{height: 420, width: '100%'}}>
                                    <DataGrid
                                        rows={this.state.players}
                                        columns={this.state.columns}
                                        pageSize={6}
                                        rowsPerPageOptions={[6]}
                                        initialState={{
                                            sorting: {
                                                sortModel: [{ field: 'wlr', sort: 'desc' }],
                                            },
                                        }}
                                    />
                                </div> : null}
                </div>
        )
    }
}