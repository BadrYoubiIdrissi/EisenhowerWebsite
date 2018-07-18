import React from "react";

let explName = {
    urgImp : "Urgent and Important",
    nurgImp : "Not urgent and Important",
    urgNimp : "Urgent and not Important",
    nurgNimp : "Not urgent and not Important",
};

export default class Quadrant extends React.Component{
    render(){
        return (
            <ul>
                {this.props.tasks.map((task, i) => {
                    return <li key={task.id}>{task.description}</li>;
                })}
                <form name = {this.props.name} onSubmit={this.props.onSubmit}>
                    <legend>{explName[this.props.name]}</legend>
                    <input name = {this.props.name} value = {this.props.inputValue} onChange={this.props.onChange}/>
                </form>
            </ul>
        );
    }
}