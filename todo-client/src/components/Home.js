import React, { Component } from "react";
import TaskList from "./Task-List/TaskList";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the task list</h1>
                <hr />
                <TaskList />
            </div>
        );
    }
}

export default Home;
