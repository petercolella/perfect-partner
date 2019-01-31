import React, {Component} from "react";
import {render} from 'react-dom'
import { BrowserRouter , Route, } from "react-router-dom";

//components
import About from './components/QuestionComponents/MainBody/About/About';
import Nav from "./components/QuestionComponents/Header/Nav";
import MainBody from "./components/QuestionComponents/MainBody/MainBody";
import RegistrationWizard from "./components/QuestionComponents/MainBody/RegistrationWizard/RegistrationWizard";
import Profile from "./components/QuestionComponents/MainBody/Profile";
import Dashboard from "./components/QuestionComponents/MainBody/Dashboard/Dashboard";

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
