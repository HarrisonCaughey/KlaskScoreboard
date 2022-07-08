import React from "react";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "toastr/toastr.scss";

export class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {environment : null};
    }

    getHost() {
        if (process.env.NODE_ENV !== 'development') {
            return "https://harrisoncaughey.github.io/KlaskScoreboard/#"
        } else {
            return ""
        }
    }

    render() {
        console.log(process.env)
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link draggable={false} href={`${this.getHost()}/`}>Home</Nav.Link>
                        <Nav.Link draggable={false} href={`${this.getHost()}/record`}>Record Results</Nav.Link>
                        <Nav.Link draggable={false} href={`${this.getHost()}/scoreboard`}>Scoreboard</Nav.Link>
                        <Nav.Link draggable={false} href={`${this.getHost()}/stats`}>Player Stats</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

