import React from "react";
import Quadrant from "./Quadrants.js";
import axios from "axios";
import {Grid} from "semantic-ui-react";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks : {
                urgImp  : [],
                nurgImp : [],
                urgNimp : [],
                nurgNimp: [],
            },
            values : {
                urgImp   : "",
                nurgImp  : "",
                urgNimp  : "",
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
        return (
            <div className="app">
                <Grid>
                    <Grid.Row>                
                        <Quadrant 
                            key="nurgImp"
                            name="nurgImp"
                            tasks={this.state.tasks["nurgImp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["nurgImp"]}/>
                        <Quadrant 
                            key={"urgImp"}
                            name={"urgImp"}
                            tasks={this.state.tasks["urgImp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["urgImp"]}/>
                    </Grid.Row>
                    <Grid.Row>    
                        <Quadrant 
                            key={"nurgNimp"}
                            name={"nurgNimp"}
                            tasks={this.state.tasks["nurgNimp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["nurgNimp"]}/>
                        <Quadrant 
                            key={"urgNimp"}
                            name={"urgNimp"}
                            tasks={this.state.tasks["urgNimp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["urgNimp"]}/>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default App;