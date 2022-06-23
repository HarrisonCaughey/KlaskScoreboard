import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";
import {Home} from "./home";
import {Scoreboard} from "./scoreboard";
import {PlayerStats} from "./player-stats";
import 'bootstrap/dist/css/bootstrap.css';
import {RecordGame} from "./record-game";

export class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {environment : null};
    }

    render() {
        return (
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Nav className="me-auto">
                            <Navbar.Brand href="/">Home</Navbar.Brand>
                            <Navbar.Toggle/>
                            <Nav.Link href="/record">Record Results</Nav.Link>
                            <Nav.Link href="/scoreboard">Scoreboard</Nav.Link>
                            <Nav.Link href="/stats">Player Stats</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/record">
                        <RecordGame />
                    </Route>
                    <Route path="/scoreboard">
                        <Scoreboard />
                    </Route>
                    <Route path="/stats">
                        <PlayerStats />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

