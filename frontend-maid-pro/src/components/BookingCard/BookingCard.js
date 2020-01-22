import React, { Component } from 'react'
import './BookingCard.css'
import { Row, Col, Divider, Button, Modal, Input, Rate } from 'antd'
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "../../config/api.service"
const { TextArea } = Input;

export default class BookingCard extends Component {
  state = {
    loading: false,
    visible: false,
    modal1Visible: false,
    rating: '',
    content: '',
    reason: ''
  };

  handleChange = (label) => e => {
    this.setState({
      [label]: e.target.value,
    })
  }
  handleSubmit = (e) => {
    axios.post(`/mybooking`, {
      rating: this.state.username,
      content: this.state.password,
      reason: this.state.reason
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.error(err)
      })
    this.setState({
      rating: '',
      content: '',
      reason: ''
      })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Row className="BookingCard-Body">
          <Col>
            <Row type="flex" align="middle" className="BookingCard-BodyTop">
              <Col span={7}>
                <Row type="flex" justify="center" align="middle" className="BookingCard-Date">
                  <Col className="BookingCard-Month">January</Col>
                  <Col className="BookingCard-Day">10</Col>
                </Row>
              </Col>
              <Col span={9}>
                <Row className="BookingCard-Details">
                  <Col className="BookingCard-Customer">Customer</Col>
                  <Col className="BookingCard-Time">10:00 - 11:00 am</Col>
                  <Col className="BookingCard-Address"><FaMapMarkerAlt /> Phetchaburi Rd, Thanon Phaya Thai, Ratchathewi</Col>
                </Row>
              </Col>
              <Col span={8}>
                <img src="JessicaSpencer.png" alt="" className="BookingCard-MaidPhoto" />
              </Col>
            </Row>
            <Divider className="BookingCard-HorizontalDivider" />
            <Row type="flex" justify="end" className="BookingCard-BodyBottom">
              <Button className="BookingCard-Cancel" onClick={this.showModal}>Cancel</Button>
              <Button className="BookingCard-Accept" onClick={() => this.setModal1Visible(true)}>Accept</Button>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
