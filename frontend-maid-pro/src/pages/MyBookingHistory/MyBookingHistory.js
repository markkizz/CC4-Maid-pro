import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from "axios";
import './MyBookingHistory.css'
import Navbar from '../../components/Navbar/Navbar'
import BookingCard from '../../components/BookingCard/BookingCard'
import { Row, Col, Tabs, BackTop } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class MyBookingHistory extends Component {
  state = {}

   componentDidMount () {
    const { id, username, type } = this.props.user
    if (type === 'EMPLOYER') {
      axios.get('/bookings/employers/')
        .then(({data}) => console.log(data))
        .catch(err => console.error(err))
    }
  }

  render() {
    return (
      <div className="MyBookingHistory-Body">
        <Navbar/>
        <Row type="flex" justify="center">
          <Col>
            <Tabs defaultActiveKey="1" onChange={callback} className="MyBookingHistory-Tabs">
              {/* Upcomming tab for accept cencel and complete for user both employer and maid */}
              <TabPane tab="Upcoming" key="1">
                <Row>
                  <Col style={{ marginBottom: 20 }}>
                    <BookingCard/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="History" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <BackTop/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})


export default connect(mapStateToProps, null)(MyBookingHistory)
