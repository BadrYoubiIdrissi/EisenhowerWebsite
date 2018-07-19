import React from "react";
import {connect} from "react-redux";
import {addTask} from "../actions";
import Quadrant from "./Quadrants.js";
import axios from "axios";
import {Grid} from "semantic-ui-react";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = this.defaultValues();
    }

    defaultValues() {
        return { 
            values : {
                urgImp   : "",
                nurgImp  : "",
                urgNimp  : "",
                nurgNimp : "",
            } 
        }
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
        this.props.addTask(name,this.state.values[name]);
        this.setState(this.defaultValues);
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
                            tasks={this.props.tasks["nurgImp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["nurgImp"]}/>
                        <Quadrant 
                            key={"urgImp"}
                            name={"urgImp"}
                            tasks={this.props.tasks["urgImp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["urgImp"]}/>
                    </Grid.Row>
                    <Grid.Row>    
                        <Quadrant 
                            key={"nurgNimp"}
                            name={"nurgNimp"}
                            tasks={this.props.tasks["nurgNimp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["nurgNimp"]}/>
                        <Quadrant 
                            key={"urgNimp"}
                            name={"urgNimp"}
                            tasks={this.props.tasks["urgNimp"]}
                            onSubmit={this.handleSubmit.bind(this)}
                            onChange={this.handleChange.bind(this)} 
                            inputValue={this.state.values["urgNimp"]}/>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tasks : state.tasks
    }
}

const mapDispatchToProps = {
    addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(App);