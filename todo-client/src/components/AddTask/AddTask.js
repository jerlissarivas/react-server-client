import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
    state = {
        title: "",
        description: "",
        complete: false
    };

    submit = event => {
        event.preventDefault();

        axios
            .post("http://localhost:3001/api/add-task", this.state)
            .then(newlyCreatedTaskFromAPI => {
                // console.log({ newlyCreatedTaskFromAPI });

                this.props.updateState();
                this.setState({ title: "", description: "", complete: false });
            })
            .catch(err => console.log({ err }));
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />

                    <input type="submit" value="Add Task" />
                </form>
            </div>
        );
    }
}

export default AddTask;
