import React from "react";
import TextareaAutosize from 'react-autosize-textarea';

export default class PostIt extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name: this.props.task.name,
        description: this.props.task.description
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmitEdit = this.onSubmitEdit.bind(this);
    }
    
    onChange(event) {
      const state = {};
      state[event.target.name] = event.target.value;
      this.setState(state); 
    }

    onSubmitEdit(event) {
      event.preventDefault();
      this.props.onSubmitEdit(this.props.task.id, this.state.name, this.state.description);
    }

    render(){
        var className = (this.props.task.width === 1 ?
                         "vertical " : this.props.task.height === 1 ?
                         "horizontal " : "big ") + "PostIt " 
                         + this.props.task.category;
        var content;
        if(this.props.edit) {
          if( this.props.task.width === 2 && this.props.task.height === 2) {
            content = 
            <div className="taskBody animated fadeIn">
              <form onSubmit={this.onSubmitEdit}>
                <TextareaAutosize className="nameInput"
                       name="name"
                       value={this.state.name}
                       onChange={this.onChange}
                       maxRows={3}/>
                <TextareaAutosize className="descriptionInput"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          maxRows={3}/>
                <button type="submit" className="submit material-icons">save</button>
              </form>
            </div>
          } else {
            content = 
            <div className="taskBody animated fadeIn">
              <form onSubmit={this.onSubmitEdit}>
                <TextareaAutosize className="nameInput"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        maxRows={this.props.task.width === 2 ? 3 : 5}/>
                <button type="submit" className="submit material-icons">save</button>
              </form>
            </div>
          }
        } else {
          if( this.props.task.width === 2 && this.props.task.height === 2) {
            content = 
            <div className="taskBody animated fadeIn">
              <p className="name">{this.props.task.name}</p>
              <div className="seperator"/>
              <p className="description">
                {this.props.task.description}
              </p>
            </div>
            
          } else {
            content = 
            <div className="taskBody animated fadeIn">
             <p className="name">{this.props.task.name}</p>
            </div>
          }
        }

        return(
          <div className={className}>
            <div className="taskHeader">
              <a onClick={() => this.props.onEdit(this.props.task.id)}><i className="material-icons">edit</i></a>
              <a onClick={() => this.props.onClose(this.props.task.id)}><i className="material-icons">close</i></a>
              <a onClick={() => this.props.onDone(this.props.task.id)}><i className="material-icons">done</i></a>
            </div>
            <div className="light"/>
            <div className="paper"/>
            {content}
          </div>);
    }
}