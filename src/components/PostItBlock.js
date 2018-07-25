import React from "react";
import {connect} from "react-redux";
import {addTask} from "../actions";

class PostItBlock extends React.Component{

    constructor(props){
        super(props);
        this.category = props.id;
        this.state = { 
            value: ""
         };
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.addTask(this.category,this.state.value);
        this.setState({value:""});
    }

    handleChange = event => {
        this.setState({value : event.target.value})
    };

    render(){
        return (
            <form className="PostItBlock" id={this.category} onSubmit={this.handleSubmit}>
                <div className="shadow"/>
                <div className="texture"/>
                <div className="light"/>
                <input 
                    name = {this.props.name}
                    value = {this.state.value}
                    onChange={this.handleChange}/>
            </form>
        );
    }
}

const mapDispatchToProps = {
    addTask
}

export default connect(null, mapDispatchToProps)(PostItBlock);