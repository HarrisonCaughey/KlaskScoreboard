import React from "react";
import {Pages} from "./constants/pages";
import {NavBar} from "./pages/header";
import {getGames} from "./services/api";

import "bulma";
import "toastr/toastr.scss";


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page: Pages.HOME, currentPreset: null};
        this.onPresetLoad = this.onPresetLoad.bind(this);
        this.testFunction = this.testFunction.bind(this);
    }

    onPresetLoad(preset) {
        this.setState({currentPreset: preset});
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
