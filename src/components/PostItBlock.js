import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import { withRouter } from "react-router";

/* A form at the bottom of the screen that ressembles a block 
    of postit notes where you write the name of the task to add it.
    The color signifies the category */

class PostItBlock extends React.Component {

    constructor(props) {
        super(props);
        this.category = props.id;
        this.state = {
            value: ""
        };
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.addTask(this.category, this.state.value);
        this.props.correctCollisions();
        this.setState({ value: "" });
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
    };

    render() {
        return (
            <form className="PostItBlock" id={this.category} onSubmit={this.handleSubmit}>
                <div className="shadow" />
                <div className="texture" />
                <div className="light" />
                <input
                    name={this.props.name}
                    value={this.state.value}
                    onChange={this.handleChange} />
            </form>
        );
    }
}

const mapDispatchToProps = {
    addTask: actions.addTask,
    correctCollisions: actions.correctCollisions
}

export default withRouter(connect(null, mapDispatchToProps)(PostItBlock));