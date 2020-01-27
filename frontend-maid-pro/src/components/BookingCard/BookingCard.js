import React, { Component } from "react";
import "./BookingCard.css";
import { Row, Col, Divider, Button } from "antd";
import { FaMapMarkerAlt, FaRegClock, FaRegCheckCircle, FaBuilding, FaHome } from "react-icons/fa";
import axios from "../../config/api.service";
import ModalAccept from "../ModalBookingAccept/ModalBookingAccept";
import ModalCancel from "../ModalBookingCancel/ModalBookingCancel";
import DisplayStatus from "./DisplayStatus/DisplayStatus";
import moment from "moment";

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
    });
  };

  render() {
    const { acceptVisible, cancelVisible, reason } = this.state;
    const { bookingUser, type } = this.props;
    const workDate = moment(bookingUser.work_date);
    const month = workDate.format("LL").split(" ")[0];
    const day = workDate.format("DD");
    const workStart = workDate.format("h:mm");
    const workEnd = workDate
      .add(bookingUser.work_hour, "hours")
      .format("h:mm a");

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
                  <Col className="BookingCard-Month">{month}</Col>
                  <Col className="BookingCard-Day">{day}</Col>
                </Row>
              </Col>
              <Col span={9}>
                <Row className="BookingCard-Details">
                  <Col className="BookingCard-Customer">
                    {bookingUser.target_data.first_name + " " + bookingUser.target_data.last_name}
                  </Col>
                  <Col className="BookingCard-Time">
                    {workStart + " - " + workEnd}
                  </Col>
                  <Col className="BookingCard-Address">
                    <FaMapMarkerAlt /> {bookingUser.customer_location}
                  </Col>
                  <Col className="BookingCard-BuildingType">
                    {bookingUser.buildingType.startsWith('คอนโด') ? <FaBuilding /> : <FaHome />} {bookingUser.buildingType}
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <img
                  src={bookingUser.target_data.profile_img}
                  alt=""
                  className="BookingCard-MaidPhoto"
                />
              </Col>
            </Row>
            <Divider className="BookingCard-HorizontalDivider" />
            <Row type="flex" align="middle" className="BookingCard-Status">
              <Col style={{ width: "100%" }}>
                <DisplayStatus type={type}
                  status={bookingUser.status}
                  onShowModal={this.showModal}
                />
              </Col>
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
