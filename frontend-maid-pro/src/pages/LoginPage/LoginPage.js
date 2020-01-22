import React, { Component } from 'react'
import './LoginPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Row, Col, Input, Icon, Button, Divider } from 'antd'
import Logo from '../../images/maidProServiceLoginLogo.png'
import { MdLockOutline } from "react-icons/md";
import axios from "../../config/api.service";
import { successLoginNotification, failLoginNotification } from './LoginNotification'
import { connect } from "react-redux";
import { login } from "../../redux/actions/actions";
import jwtDecode from 'jwt-decode'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (label) => e => {
    this.setState({
      [label]: e.target.value,
    })
  }
  handleLogin = () => {
    const { username, password } = this.state
    axios.post(`/users/sign-in`, {
      username, password
    })
      .then(({ data }) => {
        const token = data.token
        const user = jwtDecode(token)
        this.props.login(user, token)
        successLoginNotification(`Login successfully`)
        this.props.history.push("/")
      })
      .catch(err => {
        failLoginNotification(`Username or Password is invalid`)
      })
    this.setState({
      username: '',
      password: '',
    })
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Row type="flex" justify="center">
          <Col>
            <Row type="flex" justify="center">
              <img src={Logo} alt="" width="200" className="LoginPage-Logo" />
            </Row>
            <Row className="LoginPage-Input">
              <Input
                value={this.state.username}
                placeholder="username"
                prefix={<Icon type="user" className="LoginPage-UsernamePrefix"/>}
                onChange={this.handleChange('username')}
              />
            </Row>
            <Row className="LoginPage-Input">
              <Input.Password placeholder="password"
                prefix={<MdLockOutline className="LoginPage-PasswordPrefix" />}
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
          <Footer/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (user, token) => dispatch(login(user, token))
})

export default connect(null, mapDispatchToProps)(LoginPage)
