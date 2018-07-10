import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let explName = {
    urgImp : "Urgent and Important",
    nurgImp : "Not urgent and Important",
    urgNimp : "Urgent and not Important",
    nurgNimp : "Not urgent and not Important",
};

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks : {
                urgImp : [],
                nurgImp : [],
                urgNimp : [],
                nurgNimp : [],
            },
            values : {
                urgImp : "",
                nurgImp : "",
                urgNimp : "",
                nurgNimp : "",
            }   
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const tasks = {...this.state.tasks};
        const quadrantTasks = tasks[name].slice();
        quadrantTasks.push({
            id: quadrantTasks.length+1,
            description: this.state.values[name],
        });
        tasks[name] = quadrantTasks;
        this.setState({
            tasks,
            values : {
                urgImp : "",
                nurgImp : "",
                urgNimp : "",
                nurgNimp : "",
            }   
        });
    }
    handleChange = (event) => {
        const values = {...this.state.values};
        values[event.target.name] = event.target.value;
        this.setState({
            values,
        });
    }
    render(){
        let quadrants = [];
        for (var key in this.state.tasks) {
            quadrants.push(
            <Quadrant 
                key={key}
                name={key}
                tasks={this.state.tasks[key]}
                onSubmit={this.handleSubmit.bind(this)}
                onChange={this.handleChange.bind(this)} 
                inputValue={this.state.values[key]}/>);
        }
        return (
            <div className="app">
                {quadrants}
            </div>
        );
    }
}

class Quadrant extends React.Component{
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

ReactDOM.render(
    <App />,
    document.getElementById("root")
);