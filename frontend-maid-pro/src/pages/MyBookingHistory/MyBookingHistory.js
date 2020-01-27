import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../config/api.service";
import "./MyBookingHistory.css";
import Navbar from "../../components/Navbar/Navbar";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Row, Col, Tabs, BackTop } from "antd";

const { TabPane } = Tabs;

class MyBookingHistory extends Component {
  state = {
    upcomming: [],
    history: []
  };

  compareTwoArray = (arr1, arr2) => {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
  };

  filterUserStatus = users => {
    const history = [];
    const upcomming = [];
    users.forEach(user => {
      if (
        user.status === "REJECT" ||
        user.status === "CANCEL" ||
        user.status === "FINISHED"
      ) {
        history.push(user);
      } else {
        upcomming.push(user);
      }
    });
    if (
      this.compareTwoArray(history, this.state.history) ||
      this.compareTwoArray(upcomming, this.state.upcomming)
    ) {
      this.setState({
        upcomming,
        history
      });
    }
  };

  componentDidMount = async () => {
    this.handleFetchBooking();
  };

  handleFetchBooking = async () => {
    const { type } = this.props.user;
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
        this.filterUserStatus(data);
      } catch (err) {
        console.error(err);
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
              className="MyBookingHistory-Tabs"
            >
              {/* Upcomming tab for accept, cancel and complete for user both employer and maid */}
              <TabPane tab="Upcoming" key="1">
                {/* month, day, name, workHourToTime, location, status* */}
                {upcomming.length > 0 &&
                  upcomming.map((bookingUser, i) => (
                    <Row key={i}>
                      <Col>
                        <BookingCard
                          bookingUser={bookingUser}
                          type={type}
                          handleFetchBooking={this.handleFetchBooking}
                        />
                      </Col>
                    </Row>
                  ))}
              </TabPane>
              <TabPane tab="History" key="2">
                {history.length > 0 &&
                  history.map((bookingUser, i) => (
                    <Row key={i}>
                      <Col>
                        <BookingCard
                          bookingUser={bookingUser}
                          type={type}
                          handleFetchBooking={this.handleFetchBooking}
                        />
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
