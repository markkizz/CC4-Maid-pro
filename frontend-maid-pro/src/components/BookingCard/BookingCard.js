import React, { Component } from "react";
import "./BookingCard.css";
import { Row, Col, Divider } from "antd";
import { FaMapMarkerAlt, FaBuilding, FaHome } from "react-icons/fa";
import axios from "../../config/api.service";
import ModalAccept from "../ModalBookingAccept/ModalBookingAccept";
import ModalCancel from "../ModalBookingCancel/ModalBookingCancel";
import DisplayStatus from "./DisplayStatus/DisplayStatus";
import moment from "moment";
import { connect } from "react-redux";
import { thunk_action_mybooking } from "../../redux/actions/actions";

class BookingCard extends Component {
  state = {
    acceptVisible: false,
    cancelVisible: false,
    rating: 5,
    content: "",
    reason: ""
  };

  handleChange = label => ({ target: { value } }) => {
    this.setState({
      [label]: value
    });
  };

  handleEmployerClickComplete = maidId => async () => {
    try {
      await axios.post(`/add-review/${maidId}`, {
        rating: this.state.rating,
        content: this.state.content
      });
    } catch (err) {
      console.error('Error ❌', err.response.status, err.response.data.errorMessage);
    }
    try {
      await axios.put(`/bookings/maid/complete/${maidId}`);
      this.setState({
        rating: "",
        content: "",
        acceptVisible: false
      });
      this.props.fetchMyBooking();
    } catch (err) {
      console.error('Error ❌', err.response.status, err.response.data.errorMessage);
    }
  };

  handleMaidAcceptJob = employerId => () => {
    axios
      .put(`/bookings/maid/accept/${employerId}`)
      .then(() => this.props.fetchMyBooking())
      .catch(err => console.error('Error ❌', err.response.status, err.response.data.errorMessage));
  };

  handleRejectMaid = employerId => async () => {
    try {
      await axios.put(`/bookings/maid/reject/${employerId}`, { reject_note: this.state.reason });
      this.setState({ cancelVisible: false });
      this.props.fetchMyBooking();
    } catch (err) {
      console.error('Error ❌', err.response.status, err.response.data.errorMessage);
    }
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
    const { bookingUser } = this.props;
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
                    {bookingUser.target_data.first_name +
                      " " +
                      bookingUser.target_data.last_name}
                  </Col>
                  <Col className="BookingCard-Time">
                    {workStart + " - " + workEnd}
                  </Col>
                  <Col className="BookingCard-Address">
                    <FaMapMarkerAlt /> {bookingUser.customer_location}
                  </Col>
                  <Col className="BookingCard-BuildingType">
                    {bookingUser.building_type.startsWith("คอนโด") ? (
                      <FaBuilding />
                    ) : (
                      <FaHome />
                    )}
                    {bookingUser.building_type}
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
                <DisplayStatus
                  status={bookingUser.status}
                  onShowModal={this.showModal}
                  onClickMaidAcceptJob={this.handleMaidAcceptJob}
                  bookingUser={bookingUser.target_data}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <ModalAccept
          bookingUser={bookingUser}
          visible={acceptVisible}
          onShowModal={this.showModal}
          onEmployerClickComplete={this.handleEmployerClickComplete}
          onChange={this.handleChange}
          onChangeRate={this.handleRating}
        />

        <ModalCancel
          bookingUser={bookingUser}
          visible={cancelVisible}
          onShowModal={this.showModal}
          onMaidClickReject={this.handleRejectMaid}
          textAreaValue={reason}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMyBooking: () => dispatch(thunk_action_mybooking())
});

export default connect(null, mapDispatchToProps)(BookingCard);
