import React from "react";
import Matrix from "./Matrix";
import PostItBlock from "./PostItBlock";
import { categories } from "../constants";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";

class Eisenhower extends React.Component {
  render() {
    return this.props.user ? (
      <div className="matrix-container">
        <Matrix key="1" />
        <div key="2" id="PostItBlocks">
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

export default withRouter(
  connect(state => ({ user: state.user }))(Eisenhower)
);
