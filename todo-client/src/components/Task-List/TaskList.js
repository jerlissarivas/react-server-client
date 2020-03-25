import React, { Component } from "react";
import axios from "axios";
import AddTask from "../AddTask/AddTask";

class TaskList extends Component {
    state = {
        taskList: []
    };

    // this did not work since axios returns a promise and not actual data. The Only way to do this would be to make the axios call prior to the component rendering either in a componentDidMount() or in the parent component and then pass the array to be used here.

    // showTasks = async () => {
    //     try {
    //         const listResult = await axios.get(
    //             "http://localhost:3001/api/get-tasks"
    //         );

    //         console.log({ listResult });

    //         return listResult.data.length === 0 ? (
    //             <h2>There Are no Tasks to Display</h2>
    //         ) : (
    //             listResult.data.map((task, i) => {
    //                 console.log({ task });
    //                 return (
    //                     <div key={i}>
    //                         <h2>Title: {task.title}</h2>
    //                         <h3>Description: {task.description}</h3>
    //                         <h4>Completed: {task.complete ? "Yes" : "No"}</h4>
    //                         <button onClick={() => this.deleteTask(task._id)}>
    //                             Delete
    //                         </button>
    //                     </div>
    //                 );
    //             })
    //         );
    //     } catch (err) {
    //         console.log({ err });
    //     }
    // };

    // here we call the function to make the axios call which gets all the tasks from the db, we must do this prior to the render in order to get the needed information so that we can use that information to display something in the component allowing axios to make its request and receive its response.
    componentDidMount() {
        this.getTaskList();
    }

    // this function will pass down to the add task child component which will allow us to update the state for the this (the parent) component and display the updated full list of tasks
    newTaskAdded = () => {
        this.getTaskList();
    };

    // after we delete the task from the db we will need to then call the function which gets all the tasks from the db in order to update the list with the deleted task missing.
    deleteTask = taskId => {
        axios
            .delete(`http://localhost:3001/api/task/delete/${taskId}`)
            .then(messageAfterDeletingTask => {
                console.log({ messageAfterDeletingTask });
                this.getTaskList();
            })
            .catch(err => console.log({ err }));
    };

    // this function will be used in order to get the full list of tasks as well as update the state whenever we make a change like adding or deleting a task.
    getTaskList = () => {
        axios
            .get("http://localhost:3001/api/get-tasks")
            .then(taskListFromAPI => {
                this.setState({ taskList: taskListFromAPI.data });
            })
            .catch(err => console.log({ err }));
    };

    showTasks = () => {
        return this.state.taskList.length === 0 ? (
            <h2>No Tasks to Display</h2>
        ) : (
            this.state.taskList.map((task, i) => {
                return (
                    <div key={i}>
                        <h2>Title: {task.title}</h2>
                        <h3>Description: {task.description}</h3>
                        <h4>Completed: {task.complete ? "Yes" : "No"}</h4>
                        <button onClick={() => this.deleteTask(task._id)}>
                            Delete
                        </button>
                    </div>
                );
            })
        );
    };

    render() {
        return (
            <div>
                <AddTask updateState={this.newTaskAdded} />
                <hr />
                {this.showTasks()}
            </div>
        );
    }
}

export default TaskList;
