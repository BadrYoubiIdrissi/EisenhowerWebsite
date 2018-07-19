import React from "react";
import {Form, Input} from "semantic-ui-react"; 

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
                <Form name = {this.props.name} onSubmit={this.props.onSubmit} size="big">
                    <Form.Field>
                        <label>{explName[this.props.name]}</label>
                        <Input name = {this.props.name} value = {this.props.inputValue} onChange={this.props.onChange}/>
                    </Form.Field>
                </Form>
            </ul>
        );
    }
}