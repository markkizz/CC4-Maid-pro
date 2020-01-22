import React, { Component } from 'react'
import './LoginPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Row, Col, Input, Icon, Button, Divider } from 'antd'
import axios from "../../config/api.service";

export default class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (label) => e => {
    this.setState({
      [label]: e.target.value,
    })
  }
  handleLogin = (e) => {
    axios.post(`/users/sign-in`, {
      username: this.state.username,
      password: this.state.password,
    })
      .then(result => {
        // console.log(result)
      })
      .catch(err => {
        console.error(err)
      })
    this.setState({
      username: '',
      password: '',
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Row type="flex" justify="center">
          <Col>
            <Row type="flex" justify="center">
              <img src="maidProServiceLoginLogo.png" alt="" width="200" className="LoginPage-Logo" />
            </Row>
            <Row className="LoginPage-Input">
              <Input
                value={this.state.username}
                placeholder="username"
                prefix={<Icon type="user" className="LoginPage-UsernamePrefix" />}
                onChange={this.handleChange('username')}
              />
            </Row>
            <Row className="LoginPage-Input">
              <Input.Password placeholder="password"
                value={this.state.password}
                onChange={this.handleChange('password')} />

            </Row>
            <Row type="flex" justify="end" className="LoginPage-ForgetPassword">
              <a href="http://localhost:3000/">forget password?</a>
            </Row>
            <Row type="flex" justify="center">
              <Button className="LoginPage-LoginButton" onClick={this.handleLogin}>Login</Button>
            </Row>
            <Row>
              <Divider>or</Divider>
            </Row>
            <Row type="flex" justify="center">
              <Button className="LoginPage-CancelButton">Create account</Button>
            </Row>
          </Col>
        </Row>
        <div className="LoginPage-Footer">
          <Footer />
        </div>
      </div>
    )
  }
}
