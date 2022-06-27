import React from "react";
import {Dropdown, Form, Table} from "react-bootstrap";
import {saveGame} from "../services/api";
import toastr from "toastr"

export class RecordGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rounds: 3,
            playerOne: null,
            playerTwo: null,
            score: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
        }
        this.updatePlayerOne = this.updatePlayerOne.bind(this);
        this.updatePlayerTwo = this.updatePlayerTwo.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateRounds = this.updateRounds.bind(this);
        this.submit = this.submit.bind(this);
        this.playerOneWins = this.playerOneWins.bind(this);
    }

    submit() {
        if (this.validFields()) {
            let playerOneVictory = this.playerOneWins();
            let game = {
                player_one: this.state.playerOne,
                player_two: this.state.playerTwo,
                player_one_win: playerOneVictory,
                score: this.formatScore(),
                date_played: new Date().toISOString(),
            }
            console.log(game)
            try {
                saveGame(game).then((res) => {
                    console.log(res)
                })
            }
            catch {
                console.log("Error saving a game")
            }
        }
    }

    validFields() {
        try {
            if (!(this.state.playerOne && this.state.playerTwo)) {
                toastr.error("Invalid Player Names")
                return false;
            }
            for (let i = 0; i < this.state.rounds; i++) {
                let [score1, score2] = this.state.score[i]
                if (score1 !== "6" && score2 !== "6") {
                    toastr.error("Invalid scores: at least one score for each round must be 6")
                    return false;
                }
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

    updatePlayerOne(change, event) {
        this.setState({playerOne: event.target.value});
    }

    updatePlayerTwo(change, event) {
        this.setState({playerTwo: event.target.value});
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
                        <Form.Label>{"Rounds Played:  "}</Form.Label>
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

                    <div>
                    <Form.Group className="mb-3" controlId="formPlayerOne">
                        <Form.Label>Player One:</Form.Label>
                        <Form.Control type="value" placeholder="Harrison" aria-required="true" onChange={this.updatePlayerOne.bind(this, 'value')}/>
                    </Form.Group>
                    </div>
                    <div>
                    <Form.Group className="mb-3" controlId="formPlayerTwo">
                        <Form.Label>Player Two:</Form.Label>
                        <Form.Control type="text" placeholder="Khalil" aria-required="true" onChange={this.updatePlayerTwo.bind(this, 'value')}/>
                    </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formPlayerTwo">
                        <Form.Label>Scores:</Form.Label>
                        <Table>
                            <thead>
                            <tr>
                                <th>Round</th>
                                <th>{this.state.playerOne || "Player One"}</th>
                                <th>{this.state.playerTwo || "Player Two"}</th>
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

                    <footer className="modal-card-foot">
                        <a className="button" onClick={this.submit}>
                            Submit
                        </a>
                    </footer>
                </Form>
            </div>
        )
    }
}