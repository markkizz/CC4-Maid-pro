import React, { Component } from "react";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import * as PageRoutes from "./PageRoutes";
import rolesConfig from "../../config/role";

export class PrivateRoute extends Component {
  state = {
    role: "",
    allowRoutes: [],
    redirect: ''
  };

  componentDidMount = () => {
    this.refreshState();
  };

  shouldComponentUpdate = (nextProps) => {
    if(nextProps.role !== this.state.role){
      return true
    }
    return false
  }

  componentDidUpdate = () => {
    this.refreshState();
  };

  refreshState = () => {
    const role = this.props.role;
    this.setState(() => ({
      role: role,
      allowRoutes: rolesConfig[role].routes,
      redirect: rolesConfig[role].redirect
    }));
  };

  render() {
    const { allowRoutes, redirect } = this.state;
    return (
      <>
        <Switch>
          {allowRoutes.map((route, i) => (
            <Route
              exact
              path={route.path}
              component={PageRoutes[route.component]}
              key={i + route.component}
            />
          ))}
          {redirect && (<Redirect to={redirect} />)}
        </Switch>
      </>
    );
  }
}

export default withRouter(PrivateRoute);
