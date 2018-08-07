import React from "react";
import Matrix from "./Matrix";
import PostItBlock from "./PostItBlock";
import { categories } from "../constants";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";

//This is a wrapper for the Matrix component and PostItBlocks component
class Eisenhower extends React.Component {
  render() {
    return this.props.user ? (
      <div className="matrix-container">
        <Matrix/>
        <div id="PostItBlocks">
          <PostItBlock id={categories.N_URGENT_N_IMPORTANT} />
          <PostItBlock id={categories.URGENT_N_IMPORTANT} />
          <PostItBlock id={categories.N_URGENT_IMPORTANT} />
          <PostItBlock id={categories.URGENT_IMPORTANT} />
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default withRouter(connect(state => ({ user: state.user }))(Eisenhower));
