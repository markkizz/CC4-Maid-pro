import React, { Component } from "react";
import { connect } from "react-redux";
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

  componentDidMount = async () => {
    const { id, username, type } = this.props.user;
    if (type === "EMPLOYER") {
      try {
        const { data } = await axios.get("/bookings/employers");
        const history = [];
        const upcomming = [];
        data.forEach(maid => {
          maid.status === "REJECT" ||
          maid.status === "CANCEL" ||
          maid.status === "FINISHED"
            ? history.push(maid)
            : upcomming.push(maid);
        });
        console.log('history', history)
        console.log('upcomming', upcomming)
        // const upcomming = data.map(maid => )
      } catch (e) {
        console.error(e);
      }
    } else if (type === "MAID") {
      axios
        .get("/bookings/maids/")
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));
    }
  };

  render() {
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
                <Row>
                  <Col>
                    <BookingCard />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="History" key="2">
                Content of Tab Pane 2
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
