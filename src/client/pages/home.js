import React from "react";
import {Col, Dropdown, Form, Row, Table} from "react-bootstrap";
import Select from "react-select";
import {getGames, getPlayers} from "../services/api";


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: null,
            players: null
        }
    }

    componentDidMount() {
        getPlayers().then((players) => {
            this.setState({ players: players.data });
            getGames().then(games => {
                for (let i = 0; i < games.data.length; i++) {
                    games.data[i].playerOneName = players.data
                }
                this.setState({ games: games.data });
            })
        })

    }

    render() {
        return (
                <div>
                    <Form style={{padding: 100}}>

                    </Form>
                </div>
        )
    }
}