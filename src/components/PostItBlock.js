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
                <input 
                    name = {this.props.name}
                    value = {this.state.value}
                    onChange={this.handleChange}/>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostItBlock);