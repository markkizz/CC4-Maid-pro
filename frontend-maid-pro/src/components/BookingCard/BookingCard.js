import React, { Component } from 'react'
import './BookingCard.css'
import {Row, Col, Divider, Button} from 'antd'

export default class BookingCard extends Component {
  render() {
    return (
      <div>
        <Row className="BookingCard-Body">
          <Col>
            <Row type="flex" align="middle" className="BookingCard-BodyTop">
              <Col span={7}>
                <Row>
                  <Col>January</Col>
                  <Col>10</Col>
                </Row>
              </Col>
              <Col span={9}>
                <Row>Customer</Row>
                <Row>10:00 - 11:00 am</Row>
                <Row>Phetchaburi Rd, Thanon Phaya Thai, Ratchathewi</Row>
              </Col>
              <Col span={8}>
                <img src="JessicaSpencer.png" alt="" width="100%" className="BookingCard-MaidPhoto" />
              </Col>
            </Row>
            <Divider className="BookingCard-HorizontalDivider" />
            <Row type="flex" justify="end" className="BookingCard-BodyBottom">
              <Button className="BookingCard-Cancel">Cancel</Button>
              <Button className="BookingCard-Accept">Accept</Button>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
