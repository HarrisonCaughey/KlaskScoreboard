import React from "react";
import {NavBar} from "./pages/header";
import {getGames} from "./services/api";

import "bulma";
import "toastr/toastr.scss";
import {Route, Switch} from "react-router-dom";
import {RecordGame} from "./pages/record-game";
import {Scoreboard} from "./pages/scoreboard";
import {PlayerStats} from "./pages/player-stats";
import {Home} from "./pages/home";


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.testFunction = this.testFunction.bind(this);
    }

    testFunction() {
        getGames().then((res) => {
            console.log(res)
        })
    }

    render() {
        return <div>
            <NavBar/>
            <Switch>
                <Route path="/record" component={RecordGame}/>
                <Route path="/scoreboard" component={Scoreboard}/>
                <Route path="/stats" component={PlayerStats}/>
                <Route exact path="/" component={Home}/>
            </Switch>
            <button onClick={this.testFunction}>Test Button</button>
        </div>;
    }
}
