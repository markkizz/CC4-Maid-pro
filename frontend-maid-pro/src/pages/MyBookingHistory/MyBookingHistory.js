import React, { Component } from "react";
import { connect } from "react-redux";
import { selectedMaid } from '../../redux/actions/actions'
import axios from "axios";
import "./MyBookingHistory.css";
import Navbar from "../../components/Navbar/Navbar";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Row, Col, Tabs, BackTop } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class MyBookingHistory extends Component {
  state = {
    upcomming: [],
    history: []
  };

  filterUserStatus = users => {
    const history = [];
    const upcomming = [];
    users.forEach(user => {
      user.status === "REJECT" ||
      user.status === "CANCEL" ||
      user.status === "FINISHED"
        ? history.push(user)
        : upcomming.push(user);
    });
    this.setState(
      () => ({
        upcomming,
        history
      }),
      () => console.log(this.state)
    );
    console.log("history", history);
    console.log("upcomming", upcomming);
  };

  componentDidMount = async () => {
    const {type } = this.props.user;
    if (type === "EMPLOYER") {
      try {
        const { data } = await axios.get("/bookings/employers");
        this.filterUserStatus(data);
      } catch (e) {
        console.error(e);
      }
    } else if (type === "MAID") {
      try {
        const { data } = await axios.get("/bookings/maids/");
        this.filterUserStatus(data)
      } catch (err) {
        console.error(err)
      }
    }
  };

  render() {
    const { history, upcomming } = this.state;
    const { type } = this.props.user;
    return (
      <div className="MyBookingHistory-Body">
        <Navbar />
        <Row type="flex" justify="center">
          <Col>
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              className="MyBookingHistory-Tabs"
            >
              {/* Upcomming tab for accept, cancel and complete for user both employer and maid */}
              <TabPane tab="Upcoming" key="1">
                {/* month, day, name, workHourToTime, location, status* */}
                {upcomming.map((bookingUser, i) => (
                  <Row key={i}>
                    <Col>
                      <BookingCard bookingUser={bookingUser} type={type} />
                    </Col>
                  </Row>
                ))}
              </TabPane>
              <TabPane tab="History" key="2">
                {history.map((bookingUser, i) => (
                  <Row key={i}>
                    <Col>
                      <BookingCard bookingUser={bookingUser} type={type} />
                    </Col>
                  </Row>
                ))}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <BackTop />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(MyBookingHistory);
