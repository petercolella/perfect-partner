import React, {Component} from "react";
import {render} from 'react-dom'
import { BrowserRouter , Route, } from "react-router-dom";

//components
import About from './components/MainBody/About/About'
import Nav from "./components/Header/Nav";
import MainBody from "./components/MainBody/MainBody";
import RegistrationWizard from "./components/MainBody/RegistrationWizard/RegistrationWizard";
import Profile from "./components/MainBody/Profile";
import Dashboard from "./components/MainBody/Dashboard/Dashboard";

//CSS
import "./styles.css";

class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Nav />
                    <Route exact path="/" component={MainBody} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/registration" component={RegistrationWizard} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </div>
            </BrowserRouter>
        )}
}

render(<App />, document.getElementById("root"));
