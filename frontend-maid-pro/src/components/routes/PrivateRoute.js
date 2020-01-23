import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as PageRoutes from './PageRoutes';
import rolesConfig from '../../config/role';

export class PrivateRoute extends Component {
  state = {
    allowRoutes: []
  }

  componentDidMount = () => {
    console.log(this.props,this.props,this.props,this.props)
    const role = this.props.role;
    this.setState(() => ({
      allowRoutes: rolesConfig[role].routes
    }));
  };

  render() {
    const {allowRoutes} = this.state
    return (
      <>
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
