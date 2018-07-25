import React from "react";

export default class PostIt extends React.Component{
    render(){
        var className = (this.props.task.width === 1? "small " : "big ") + "PostIt " + this.props.task.category;
        return(
          <div className={className}>
            <div className="taskHeader"></div>
            <div className="light"/>
            <p className="description">
              {this.props.task.name}
            </p>
          </div>);
    }
}