import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './Registration.css'
import { Row, Col, Input, Icon, Button } from 'antd';
import Logo from '../../images/maidProServiceLoginLogo.png'
import { MdLockOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import axios from "../../config/api.service"

export default class Registration extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  }

  handleChange = (label) => e => {
    this.setState({
      [label]: e.target.value,
    })
  }
  handleSubmit = (e) => {
    axios.post(`/register`, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.error(err)
      })
      this.setState({
        username: '',
        password: '',
        email: ''
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Row type="flex" justify="center">
          <Col>
            <Row type="flex" justify="center">
              <img src={Logo} alt="" width="200" className="Registration-Logo" />
            </Row>
            <Row type="flex" justify="center" className="Registration-RegisterText">
              Register
            </Row>
            <Row className="Registration-Input">
              <Input
                value={this.state.username}
                placeholder="username"
                prefix={<Icon type="user" className="Registration-UsernamePrefix" />}
                onChange={this.handleChange('username')}
              />
            </Row>
            <Row className="Registration-Input">
              <Input.Password
                value={this.state.password}
                placeholder="password"
                prefix={<MdLockOutline className="Registration-PasswordPrefix" />}
                onChange={this.handleChange('password')}
              />
            </Row>
            <Row className="Registration-Input">
              <Input
                value={this.state.email}
                placeholder="email"
                prefix={<AiOutlineMail className="Registration-EmailPrefix" />}
                onChange={this.handleChange('email')}
              />
            </Row>
            <Row type="flex" justify="center">
              <Button className="Registration-LoginButton" onClick={this.handleSubmit}>Submit</Button>
            </Row>
            <Row type="flex" justify="center">
              <Button className="Registration-CancelButton">Cancel</Button>
            </Row>
          </Col>
        </Row>
        <div className="Registration-Footer">
          <Footer />
        </div>
      </div>
    )
  }
}
