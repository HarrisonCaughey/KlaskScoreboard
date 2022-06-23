import React from "react";
import {Button, Container, Dropdown, Form} from "react-bootstrap";


export class RecordGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rounds: 3,
            playerOne: "",
            playerTwo: "",
            score: [],
        }
        this.updatePlayerOne = this.updatePlayerTwo.bind(this);
        this.updatePlayerTwo = this.updatePlayerTwo.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateRounds = this.updateRounds.bind(this);
    }

    updatePlayerTwo(name) {
        this.setState({playerTwo: name});
    }

    updatePlayerOne(name) {
        this.setState({playerOne: name});
    }

    updateRounds(rounds) {
        this.setState({rounds: rounds});
    }

    updateScore(score) {

    }

    render() {
        return (
            <div>
                <Form style={{padding: 100}}>
                    <Form.Group className="mb-3" controlId="formRounds">
                        <Form.Label>Rounds Played:</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPlayerOne">
                        <Form.Label>Player One:</Form.Label>
                        <Form.Control type="password" placeholder="Harrison" onChange={this.updatePlayerOne}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlayerTwo">
                        <Form.Label>Player Two:</Form.Label>
                        <Form.Control type="password" placeholder="Khalil" onChange={this.updatePlayerTwo}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        )
    }
}