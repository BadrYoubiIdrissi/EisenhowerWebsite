import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../actions";


class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div className="container">
          <Link to="/" className="button">
            <i className="material-icons">home</i>
          </Link>
          <img
            src={require("../images/Logo.svg")}
            alt="logo"
            className="logo"
          />
          <Link to="/login" className="button">
            <i className="material-icons">person</i>
          </Link>
          {this.props.user ? (
            <a className="button logout" onClick={() => this.props.logout()}>
              Logout
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => ({ user: state.user }), { logout : actions.logout })(Header));
