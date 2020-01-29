import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import * as PageRoutes from './PageRoutes';
import rolesConfig from '../../config/role';

export class PrivateRoute extends Component {
  state = {
    role: 'guest',
    allowRoutes: [],
    redirect: '/'
  }

  componentDidMount = () => {
    console.log('pass private didmount')
    this.refreshState()
  };

  componentDidUpdate = (prevProps) => {
    if(prevProps.role !== this.state.role){
      this.refreshState()
    }
  }

  refreshState = () => {
    const role = this.props.role;
    this.setState(() => ({
      role: role,
      allowRoutes: rolesConfig[role].routes,
      redirect: rolesConfig[role].redirect
    }));
  }

  render() {
    const {allowRoutes, redirect} = this.state
    return (
      <>
        <Redirect to={redirect}/>
        {allowRoutes.map((route, i) => (
          <Route
            exact
            path={route.path}
            component={PageRoutes[route.component]}
            key={i + route.component}
          />
        ))}
      </>
    )
  }
}

export default withRouter(PrivateRoute)
