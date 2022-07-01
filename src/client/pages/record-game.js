import React from "react";
import Select from "react-select";
import {Col, Dropdown, Form, Row, Table} from "react-bootstrap";
import {saveGame, getPlayers} from "../services/api";
import toastr from "toastr"

export class RecordGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rounds: 3,
            playerOne: null,
            playerTwo: null,
            score: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
            players: null
        }
        this.updatePlayerOne = this.updatePlayerOne.bind(this);
        this.updatePlayerTwo = this.updatePlayerTwo.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateRounds = this.updateRounds.bind(this);
        this.submit = this.submit.bind(this);
        this.playerOneWins = this.playerOneWins.bind(this);
    }

    componentDidMount() {
        getPlayers().then((players) => {
            for (let i = 0; i < players.data.length; i++) {
                players.data[i].label = `${players.data[i].name}`;
                players.data[i].value = `${players.data[i].id}`;
            }
            this.setState({ players: players.data });
        })
    }

    submit() {
        if (this.validFields()) {
            let playerOneVictory = this.playerOneWins();
            let game = {
                player_one: this.state.playerOne.id,
                player_two: this.state.playerTwo.id,
                player_one_win: playerOneVictory,
                score: this.formatScore(),
                date_played: new Date().toISOString(),
            }
            try {
                saveGame(game).then((res) => {
                    if ((this.state.playerOne.name === "Harrison" && game.player_one_win) ||
                        (this.state.playerTwo.name === "Harrison" && !game.player_one_win)) {
                        toastr.success("Game recorded, another effortless victory for Harrison")
                    } else if ((this.state.playerOne.name === "Harrison" && !game.player_one_win) ||
                            (this.state.playerTwo.name === "Harrison" && game.player_one_win)) {
                        toastr.success("Game recorded, you'll get em' next time Harrison")
                    } else {
                        toastr.success("Game recorded")
                    }

                    // Update player info

                })
            }
            catch {
                toastr.error("Error recording game")
            }
        }
    }

    isDraw() {
        let playerOneWins = 0;
        for (let i = 0; i < this.state.rounds; i++) {
            let [score1, score2] = this.state.score[i];
            if (score1 > score2) {
                playerOneWins++;
            }
        }
        return this.state.rounds - playerOneWins === playerOneWins;
    }

    validFields() {
        try {
            if (!(this.state.playerOne && this.state.playerTwo) ||
                    !(this.state.playerOne.name && this.state.playerTwo.name)) {
                toastr.error("Invalid Player Names")
                return false;
            }
            for (let i = 0; i < this.state.rounds; i++) {
                try {
                    let [score1, score2] = this.state.score[i]
                    if (score1 === "6" && score2 === "6") {
                        toastr.error("Both players can't win a round");
                        return false;
                    }
                    if (score1 !== "6" && score2 !== "6") {
                        toastr.error("Invalid scores: at least one score for each round must be 6")
                        return false;
                    }
                    if (score1 === "" || score2 === "") {
                        toastr.error("Invalid scores: both scores must have a value")
                        return false;
                    }
                } catch {
                    toastr.error(`Row ${i + 1} is missing a score`)
                    return false;
                }
            }
            if (this.isDraw()) {
                toastr.error(`Games can't result in a draw`)
                return false;
            }
        } catch (e) {
            toastr.error("Unhandled error when validating fields")
            return false;
        }
        return true;
    }

    formatScore() {
        let result = []
        for (let i = 0; i < this.state.rounds; i++) {
            let round = `${this.state.score[i][0]}-${this.state.score[i][1]}`
            result.push(round)
        }
        console.log(result)
        return result
    }

    playerOneWins() {
        let victories = 0
        let losses = 0
        for (let i = 0; i < this.state.rounds; i++) {
            this.state.score[i][0] > this.state.score[i][1] ? victories++ : losses++
        }
        return victories > losses;
    }

    updatePlayerOne(value) {
        this.setState({playerOne: value});
    }

    updatePlayerTwo(value) {
        this.setState({playerTwo: value});
    }

    updateRounds(event) {
        this.setState({rounds: event.target.tabIndex});
    }

    updateScore(event) {
        if (event.target.value === "") {
            let score = this.state.score
            score[event.target.tabIndex][parseInt(event.target.name)] = event.target.value
            this.setState({score: score})
        } else {
            try {
                let value = parseInt(event.target.value)
                if (value >= 0 && value <= 6) {
                    let score = this.state.score
                    score[event.target.tabIndex][parseInt(event.target.name)] = event.target.value
                    this.setState({score: score})
                }
            }
            catch (e) {
            }
        }
    }

    render() {
        return (
            <div>
                <Form style={{padding: 100}}>
                    <Form.Group className="mb-3" controlId="formRounds">
                        <Form.Label>Rounds Played:</Form.Label>
                        <Dropdown style={{paddingLeft: 5}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.rounds}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item tabIndex={1} onClick={this.updateRounds}>1</Dropdown.Item>
                                <Dropdown.Item tabIndex={2} onClick={this.updateRounds}>2</Dropdown.Item>
                                <Dropdown.Item tabIndex={3} onClick={this.updateRounds}>3</Dropdown.Item>
                                <Dropdown.Item tabIndex={4} onClick={this.updateRounds}>4</Dropdown.Item>
                                <Dropdown.Item tabIndex={5} onClick={this.updateRounds}>5</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Player One</Form.Label>
                            { this.state.players ?
                                    this.state.playerTwo ?
                                    <Select options={this.state.players.filter(player => player.name !== this.state.playerTwo.name)}
                                            key={this.state.players}
                                            onChange={(value) => this.updatePlayerOne(value)}>
                                    </Select>
                                            :
                                    <Select options={this.state.players} key={this.state.players}
                                            onChange={(value) => this.updatePlayerOne(value)}>
                                    </Select>
                                    : null
                            }
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Player Two</Form.Label>
                            { this.state.players ?
                                    this.state.playerOne ?
                                    <Select options={this.state.players.filter(player => player.name !== this.state.playerOne.name)}
                                            key={this.state.players}
                                            onChange={(value) => this.updatePlayerTwo(value)}>
                                    </Select>
                                            :
                                    <Select options={this.state.players} key={this.state.players}
                                            onChange={(value) => this.updatePlayerTwo(value)}>
                                    </Select>
                                    : null
                            }
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formPlayers">
                        <Form.Label>Scores:</Form.Label>
                        <Table>
                            <thead>
                            <tr>
                                <th>Round</th>
                                <th>{this.state.playerOne ? this.state.playerOne.name : "Player One"}</th>
                                <th>{this.state.playerTwo ? this.state.playerTwo.name : "Player Two"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.score.map((value, index) => {
                                let readOnly = index >= this.state.rounds;
                                return (
                                        <tr key={index} color={"#6c757d"}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <input hidden={readOnly}
                                                       value={this.state.score[index][0]}
                                                       name="0"
                                                       tabIndex={index}
                                                       onChange={this.updateScore}/>
                                            </td>
                                            <td>
                                                <input hidden={readOnly}
                                                       value={this.state.score[index][1]}
                                                       name="1"
                                                       tabIndex={index}
                                                       onChange={this.updateScore}/>
                                            </td>
                                        </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </Form.Group>

                    <footer>
                        <a className="button" href="/#" onClick={this.submit}>
                            Submit
                        </a>
                    </footer>
                </Form>
            </div>
        )
    }
}