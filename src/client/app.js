import React from "react";
import {NavBar} from "./pages/header";
import {getGames} from "./services/api";

import "bulma";
import "toastr/toastr.scss";


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
            <button onClick={this.testFunction}>Test Button</button>
        </div>;
    }
}
