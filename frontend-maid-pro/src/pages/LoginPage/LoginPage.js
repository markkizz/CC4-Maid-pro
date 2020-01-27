import React, { Component } from "react";
import "./LoginPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Row, Col, Input, Icon, Button, Divider, Form } from "antd";
import { Link, withRouter } from 'react-router-dom';
import Logo from "../../images/maidProServiceLoginLogo.png";
import { MdLockOutline } from "react-icons/md";
import axios from "../../config/api.service";
import { openSuccessLoginNotification, openFailedLoginNotification } from "./LoginPage.noti";
import { connect } from "react-redux";
import { login } from "../../redux/actions/actions";
import jwtDecode from "jwt-decode";

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount = () => {
    this.setState({ ...this.state });
  };

  handleChange = label => e => {
    this.setState({
      [label]: e.target.value
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
      const { username, password } = values;
      if (!error) {
        axios.post(`/users/sign-in`, {
          username,
          password
        })
          .then(({ data }) => {
            const token = data.token;
            const user = jwtDecode(token);
            this.props.login(user, token);
            openSuccessLoginNotification(`User ${username} is Logged In`);
            this.props.history.push("/");
          })
          .catch(err => {
            console.error(`Error ❌`, err.response.status, err.response.data);
            openFailedLoginNotification(err.response.data);
          });
        this.setState({
          username: "",
          password: ""
        });
      }
    })
  };

  render() {

    const { form } = this.props;

    return (
      <div>
        <Navbar />
        <Row type="flex" justify="center">
          <Col>
            <Row type="flex" justify="center">
              <img src={Logo} alt="" width="200" className="LoginPage-Logo" />
            </Row>
            <Form onSubmit={this.handleLogin}>
              <Form.Item>
                <Row className="LoginPage-Input">
                  {form.getFieldDecorator('username', {
                    rules: [
                      { required: true, message: 'Please input Username' }
                    ]
                  })(<Input
                    placeholder="username"
                    prefix={<Icon type="user" className="LoginPage-UsernamePrefix" />}
                  />)}
                </Row>
              </Form.Item>
              <Form.Item>
                <Row className="LoginPage-Input">
                  {form.getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please input Password' }
                    ]
                  })(<Input.Password
                    placeholder="password"
                    prefix={<MdLockOutline className="LoginPage-PasswordPrefix" />}
                  />)}
                </Row>
              </Form.Item>
              <Row type="flex" justify="end" className="LoginPage-ForgetPassword">
                <a href="http://localhost:3000/">forget password?</a>
              </Row>
              <Form.Item>
                <Row type="flex" justify="center">
                  <Button type="primary" htmlType="submit"
                          className="LoginPage-LoginButton"
                  >
                    Login
                  </Button>
                </Row>
              </Form.Item>
              <Row className="LoginPage-Divider">
                <Divider>or</Divider>
              </Row>
              <Row type="flex" justify="center">
                <Button className="LoginPage-CreateAccountButton">
                  <Link to="/register">Create account</Link>
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
        <div className="LoginPage-Footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (user, token) => dispatch(login(user, token))
});

const WrappedLoginForm = Form.create({ name: 'LoginPage' })(LoginPage);
export default connect(null, mapDispatchToProps)(WrappedLoginForm);
