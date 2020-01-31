import React, { Component } from "react";
import { connect } from "react-redux";
import "./MyBookingHistory.css";
import Navbar from "../../components/Navbar/Navbar";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Row, Col, Tabs, BackTop } from "antd";
import { increaseNewBookingCounter, thunk_action_mybooking } from "../../redux/actions/actions";

const { TabPane } = Tabs;

class MyBookingHistory extends Component {

  componentDidMount = () => {
    this.props.fetchMyBooking()
  };

  render() {
    const { history, upcomming } = this.props;
    return (
      <div className="MyBookingHistory-Body">
        <Navbar />
        <Row type="flex" justify="center">
          <Col>
            <Tabs
              defaultActiveKey="1"
              className="MyBookingHistory-Tabs"
            >
              <TabPane tab="Upcoming" key="1" forceRender>
                {upcomming.length > 0 &&
                  upcomming.map((bookingUser, i) => (
                    <Row key={i}>
                      <Col>
                        <BookingCard
                          bookingUser={bookingUser}
                        />
                      </Col>
                    </Row>
                  ))}
              </TabPane>
              <TabPane tab="History" key="2" forceRender>
                {history.length > 0 &&
                  history.map((bookingUser, i) => (
                    <Row key={i}>
                      <Col>
                        <BookingCard
                          bookingUser={bookingUser}
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
  upcomming: state.booking.upcomming,
  history: state.booking.history
});

const mapDispatchToProps = dispatch => ({
  countingMyBooking:(numberOfBooking) => dispatch(increaseNewBookingCounter(numberOfBooking)),
  fetchMyBooking: () => dispatch(thunk_action_mybooking())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingHistory);
