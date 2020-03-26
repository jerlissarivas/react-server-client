import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
