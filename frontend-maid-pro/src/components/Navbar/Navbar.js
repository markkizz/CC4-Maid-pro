import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/actions";
import "./Navbar.css";
import { Row, Col, Icon, Drawer, Button, Menu, Dropdown } from "antd";
import Logo from "../../images/maidProServiceLogo.png";
import { Link } from "react-router-dom";
import ModalSearch from "../../components/ModalSearch/ModalSearch";
import CustomBadge from "../CustomBadge/CustomBadge";
import { FaUserCircle } from "react-icons/fa";

class Navbar extends Component {
  state = {
    visible: false,
    modalVisible: false,
    isDropdownVisible: false
  };

  renderMenuDropdown = role => {
    const { logout, bookingCount } = this.props;
    const guestMenu = (
      <Menu>
        <Menu.Item className="Navbar-MenuDropdown">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item className="Navbar-MenuDropdown">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item className="Navbar-MenuDropdown">
          <Link to="/">Preferences</Link>
        </Menu.Item>
      </Menu>
    );
    const userMenu = (
      <Menu>
        <Menu.Item>
          <CustomBadge count={bookingCount}>
            <Link to="/mybooking" className="Navbar-MenuDropdown">
              My Booking
            </Link>
          </CustomBadge>
        </Menu.Item>
        <Menu.Item>
          <Link to="/" onClick={logout} className="Navbar-MenuDropdown">
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    );
    if (role !== "guest") {
      return userMenu;
    }

    return guestMenu;
  };

  handleModalVisible = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible
    }));
  };

  handleDropdown = value => {
    this.setState({
      isDropdownVisible: value
    });
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
    const { modalVisible, isDropdownVisible } = this.state;
    const { user, bookingCount } = this.props;
    const { role } = user;
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
                <Dropdown
                  overlay={this.renderMenuDropdown(role)}
                  placement="bottomCenter"
                  trigger={["click"]}
                  onVisibleChange={this.handleDropdown}
                >
                  <Button className="Navbar-MenuButton Navbar-Center">
                    {role !== "guest" ? (
                      <CustomBadge count={bookingCount} showBadge={isDropdownVisible}>
                        <img
                          src={user.profile_img}
                          className="Navbar-imgDropdown"
                        />
                      </CustomBadge>
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
  user: state.user,
  bookingCount: state.booking.newBookingCounter
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
