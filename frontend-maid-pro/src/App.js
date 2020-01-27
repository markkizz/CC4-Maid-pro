import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./components/routes/PrivateRoute";



export class App extends Component {
  render() {
    const { role } = this.props.user;
    window.appHistory = this.props.history
    return (
      <>
        <Switch>
          <PrivateRoute role={role} />
        </Switch>
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
