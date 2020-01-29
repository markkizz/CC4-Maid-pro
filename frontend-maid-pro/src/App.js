import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./components/routes/PrivateRoute";

export class App extends Component {
  render() {
    const { role } = this.props.user;
    console.log("role App", role);
    window.appHistory = this.props.history;
    return (
      <>
        <PrivateRoute role={role} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default withRouter(connect(mapStateToProps, null)(App));
