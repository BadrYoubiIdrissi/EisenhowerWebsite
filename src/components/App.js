import React from "react";
import Quadrant from "./Quadrants.js";
import axios from "axios";

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

    componentDidMount() {
        this.apiTest();
    }

    apiTest = async () => {
        var resultat = await axios.get('/api');
        console.log(resultat);
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

export default App;