import React, { Component } from "react";
import "./BookingCard.css";
import { Row, Col, Divider, Button } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "../../config/api.service";
import ModalAccept from "../ModalBookingAccept/ModalBookingAccept";
import ModalCancel from "../ModalBookingCancel/ModalBookingCancel";
import { openBookingSuccessNotification, openBookingFailedNotification } from './BookingCard.noti';

export default class BookingCard extends Component {
  state = {
    acceptVisible: false,
    cancelVisible: false,
    rating: "",
    content: "",
    reason: ""
  };

  handleChange = label => ({ target: { value } }) => {
    this.setState(() => ({
      [label]: value
    }), () => console.log(this.state));
  };

  handleSubmit = () => {
    axios
      .post(`/mybooking`, {
        rating: this.state.username,
        content: this.state.password,
        reason: this.state.reason
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
    this.setState({
      rating: "",
      content: "",
      reason: ""
    });
  };

  showModal = label => () => {
    this.setState(state => ({
      [label]: !state[label]
    }));
  };

  handleRating = value => {
    this.setState({
      rating: value
    })
  };

  render() {
    const { acceptVisible, cancelVisible, reason } = this.state;
    return (
      <>
        <Row className="BookingCard-Body">
          <Col>
            <Row type="flex" align="middle" className="BookingCard-BodyTop">
              <Col span={7}>
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  className="BookingCard-Date"
                >
                  <Col className="BookingCard-Month">January</Col>
                  <Col className="BookingCard-Day">10</Col>
                </Row>
              </Col>
              <Col span={9}>
                <Row className="BookingCard-Details">
                  <Col className="BookingCard-Customer">Customer</Col>
                  <Col className="BookingCard-Time">10:00 - 11:00 am</Col>
                  <Col className="BookingCard-Address">
                    <FaMapMarkerAlt /> Phetchaburi Rd, Thanon Phaya Thai,
                    Ratchathewi
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <img
                  src="JessicaSpencer.png"
                  alt=""
                  className="BookingCard-MaidPhoto"
                />
              </Col>
            </Row>
            <Divider className="BookingCard-HorizontalDivider" />
            <Row type="flex" justify="end" className="BookingCard-BodyBottom">
              <Button
                className="BookingCard-Cancel"
                onClick={this.showModal("cancelVisible")}
              >
                Cancel
              </Button>
              <Button
                className="BookingCard-Accept"
                onClick={this.showModal("acceptVisible")}
              >
                Accept
              </Button>
            </Row>
          </Col>
        </Row>

        <ModalAccept
          visible={acceptVisible}
          onShowModal={this.showModal}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onChangeRate={this.handleRating}
        />
        <ModalCancel
          visible={cancelVisible}
          onShowModal={this.showModal}
          onSubmit={this.handleSubmit}
          textAreaValue={reason}
          onChange={this.handleChange}
        />
      </>
    );
  }
}
