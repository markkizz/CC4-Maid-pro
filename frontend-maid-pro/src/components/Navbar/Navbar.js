import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/actions";
import "./Navbar.css";
import { Row, Col, Icon, Drawer, Button, Menu, Dropdown } from "antd";
import Logo from "../../images/maidProServiceLogo.png";
import { Link } from "react-router-dom";
import ModalSearch from "../../components/ModalSearch/ModalSearch";
import { FaUserCircle } from "react-icons/fa";

class Navbar extends Component {
  state = {
    visible: false,
    modalVisible: false
  };

  renderMenuDropdown = role => {
    const {logout} = this.props
    const guestMenu = (
      <Menu>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Preferences</Link>
        </Menu.Item>
      </Menu>
    );
    const userMenu = (
      <Menu>
        <Menu.Item>
          <Link to="/mybooking">my Booking</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/" onClick={logout} >Logout</Link>
        </Menu.Item>
      </Menu>
    )
    if (role !== 'guest') {
      return userMenu
    }

    return guestMenu
  };

  handleModalVisible = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible
    }));
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { modalVisible } = this.state;
    const { user } = this.props;
    const {role} = user
    return (
      <>
        <div>
          <Row type="flex" align="middle" className="Navbar-Body">
            <Col span={4}>
              <Link to="/">
                <img src={Logo} alt="" width="125" />
              </Link>
            </Col>
            <Col span={20}>
              <Row type="flex" justify="end">
                <Icon
                  type="search"
                  className="Navbar-Icon"
                  onClick={this.handleModalVisible}
                />
                <Icon
                  type="menu"
                  className="Navbar-Icon"
                  onClick={this.showDrawer}
                />
                <Drawer
                  title="Menu"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                >
                  <Link to="/">
                    <Col>
                      <Button icon="home" className="Navbar-DrawerButtons">
                        Home
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/search/quicksearch">
                    <Col>
                      <Button icon="search" className="Navbar-DrawerButtons">
                        Search Maid
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/payment">
                    <Col>
                      <Button
                        icon="credit-card"
                        className="Navbar-DrawerButtons"
                      >
                        Payment
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/register/maid">
                    <Col>
                      <Button
                        icon="usergroup-add"
                        className="Navbar-DrawerButtons"
                      >
                        Join As Maid
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/">
                    <Col>
                      <Button icon="file-text" className="Navbar-DrawerButtons">
                        Policy
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/aboutus">
                    <Col>
                      <Button icon="user" className="Navbar-DrawerButtons">
                        About Us
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/login">
                    <Col>
                      <Button icon="login" className="Navbar-DrawerButtons">
                        Login
                      </Button>
                    </Col>
                  </Link>
                  <Link to="/register">
                    <Col>
                      <Button icon="user-add" className="Navbar-DrawerButtons">
                        Register
                      </Button>
                    </Col>
                  </Link>
                </Drawer>
              </Row>
              <Row type="flex" justify="end" className="Navbar-Menu">
                <Link to="/">
                  <Button className="Navbar-MenuButton">Home</Button>
                </Link>
                <Link to="/search/quicksearch">
                  <Button className="Navbar-MenuButton">Search</Button>
                </Link>
                <Link to="/payment">
                  <Button className="Navbar-MenuButton">Payment</Button>
                </Link>
                <Link to="/register/maid">
                  <Button className="Navbar-MenuButton">Join As Maid</Button>
                </Link>
                <Link to="/">
                  <Button className="Navbar-MenuButton">Policy</Button>
                </Link>
                <Link to="/aboutus">
                  <Button className="Navbar-MenuButton">About Us</Button>
                </Link>
                <Dropdown overlay={this.renderMenuDropdown(role)} placement="bottomCenter">
                  <Button className="Navbar-MenuButton Navbar-Center">
                    {role !== 'guest' ? (
                      <img
                        src={user.profile_img}
                        className="Navbar-imgDropdown"
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                  </Button>
                </Dropdown>
              </Row>
            </Col>
          </Row>
          <Row className="Navbar-Border" />
        </div>
        <ModalSearch
          onCancel={this.handleModalVisible}
          visible={modalVisible}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
