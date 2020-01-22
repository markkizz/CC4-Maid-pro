import React, { Component } from "react";
import "./Booking.css";
import { connect } from 'react-redux';
import { Card,Row,Col,Input,Button,Icon,Form,Select,DatePicker,Upload,Modal } from "antd";
import moment from "moment";
import { FaClock, FaBook } from "react-icons/fa";
import axios from '../../config/api.service'
const { Option } = Select;

class Booking extends Component {
  state = {
    visible: false,
    address: '',
    category: '',
    Date: '',
  }

  handleChange = (label) => e => {
console.log(e.target.value)
    this.setState({
      [label]: e.target.value,
    })
  }

  handleSelectCondo = (value) => {
    console.log(value)
    this.setState({
      category: value,
    })
  }

  handleSelectHour = (value) => {
    console.log(value)
    this.setState({
      hour: value
    })
  }

  handleDatePicker = (value) => {
    console.log(value)
    this.setState({
      Date: value,
    })
  }

  handleConfirm = (e) => {
    axios.post(`/bookings/maids/:maidId`, {
      // ${maid_id}
      address: this.state.address,
      category: this.state.category,
      Date: this.state.Date,
      hour: this.state.hour,
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.error(err)
      })
      
  }

  render() {
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
    const { TextArea } = Input;
    return (
      <Modal 
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        className="Booking-Top"
      >
        <Row type="flex" justify="center">
          <Card className="Booking-Card">
            <Row className="Booking-Margin" style={{ width: "100%" }}>
              <Col>
                <FaBook className="Booking-icon" />
                <span className="Booking-icon_font"> Booking </span>
              </Col>
            </Row>

            <Row className="Booking-Margin2" style={{ width: "100%" }}>
              <Col>
                <FaClock className="Booking-iconClock" />
                <span className="Booking_font"> Wait confirm from Maid</span>
              </Col>
            </Row>

            <Row
              className="Booking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="Booking_font" span={7} offset={1}>
                Category
              </Col>
              <Col span={16}>
                <Select
                  onChange={this.handleSelectCondo}
                  defaultValue="คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)"
                  style={{ width: "100%" }}
                >
                  <Option value="1">
                    คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)
                  </Option>
                  <Option value="2">
                    คอนโด 1 ห้องนอน (ไม่เกิน 50 ตร.ม.)
                  </Option>
                  <Option value="3">
                    คอนโด 2 ห้องนอน (ไม่เกิน 80 ตร.ม.)
                  </Option>
                  <Option value="4">
                    คอนโด 3 ห้องนอน (ไม่เกิน 100 ตร.ม.)
                  </Option>
                  <Option value="5">
                    บ้าน 1 ชั้น (ไม่เกิน 100 ตร.ม.)
                  </Option>
                  <Option value="6">บ้าน 2-3 ชั้น (100-200 ตร.ม.)</Option>
                  <Option value="7">บ้าน 200 ตร.ม. ขึ้นไป</Option>
                </Select>
              </Col>
            </Row>

            <Row
              className="Booking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="Booking_font" span={7} offset={1}>
                Date
              </Col>
              <Col span={16}>
                <DatePicker
                  defaultValue={moment("01/01/2015", dateFormatList[0])}
                  format={dateFormatList}
                  style={{ width: "100%" }}
                  onChange={this.handleDatePicker}
                />
              </Col>
            </Row>

            <Row
              className="Booking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="Booking_font" span={7} offset={1}>
                Hour
              </Col>
              <Col span={16}>
                <Select defaultValue="1" style={{ width: "100%" }}
                onChange={this.handleSelectHour}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
              </Col>
            </Row>

            <Row
              className="Booking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="Booking_font" span={7} offset={1}>
                Price
              </Col>
              <Col input span={16}>
                <Input style={{ width: "100%" }} 
                onChange={this.handleChange('price')}
                />
              </Col>
            </Row>

            <Row
              className="Booking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="Booking_font" span={7} offset={1}>
                location
              </Col>
              <Col className="Booking_font" span={16}>
                Current address
              </Col>
            </Row>

            <Row
              className="Booking-Margin2"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col span={16} offset={8}>
                <TextArea
                  style={{ width: "100%" }}
                  className="Bookbank_font"
                  rows={2}
                  placeholder="or not current address please enter your address"
                  onChange={this.handleChange('address')}
                />
              </Col>
            </Row>

            <Row className="Booking-Margin">
              <Col className="Booking3_font" span={16} offset={8}>
                **โอนเงินเข้าบัญชี ธนาคารเอบี สาขาราชเทวี เลขที่บัญชี
                012-3-99999-0**
              </Col>
            </Row>

            <Row className="Booking-Margin3">
              <Col className="Booking_font" span={7} offset={1}>
                pay
              </Col>
              <Col span={16} style={{ width: "10%" }}>
                <Upload>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </Col>
            </Row>

            <Row className="Booking-Margin2">
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={() => this.props.onCancel(false)} className="Booking-CancelButton">Cancel</Button>
              </Col>
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button className="Booking-ConfirmButton" onClick={this.handleConfirm}>confirm</Button>
              </Col>
            </Row>
          </Card>
        </Row>
        <div
          className="Booking-Footer"
          type="flex"
          justify="center"
          align="middle"
        ></div>
      </Modal>
    );
  }
}

export default Form.create({})(Booking);
