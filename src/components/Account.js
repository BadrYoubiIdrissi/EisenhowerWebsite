import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import actions from "../actions";

class Account extends React.Component{
    constructor(props){
        super(props);
        this.state={username:"",password:"", activeTab:"login"};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        if (this.state.activeTab === "login")
            this.props.attemptLogin(this.state.username, this.state.password);
        else if(this.state.activeTab === "register")
            this.props.attemptRegister(this.state.username, this.state.password);
    }

    toLogin = () => {
        this.setState({activeTab:"login"});
    }

    toRegister = () => {
        this.setState({activeTab:"register"});
    }

    render(){
        return this.props.user ? <Redirect to="/"/> : (
            <div className="account-container">
                <div className="login-container">
                    <div className="title">
                        <h3 className={this.state.activeTab === "login" ? "login active" : "login"}
                            onClick={this.toLogin}>LOGIN</h3>
                        <h3 className={this.state.activeTab === "register" ? "register active" : "register"}
                            onClick={this.toRegister}>REGISTER</h3>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            name="username" 
                            placeholder="Username" 
                            autoComplete="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="Password" 
                            autoComplete="current-password"
                            value={this.state.password} 
                            onChange={this.handleChange}/>
                        <button className="submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    attemptLogin : actions.attemptLogin,
    attemptRegister : actions.attemptRegister
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));