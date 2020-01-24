import React, { Component } from "react";
import "./ModalBooking.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Input, Button, Icon, Form, Select, DatePicker, Upload, Modal } from "antd";
// import moment from "moment";
import { FaClock, FaBook } from "react-icons/fa";
import axios from '../../config/api.service'

const { Option } = Select;

class ModalBooking extends Component {
  state = {
    visible: false,
    customer_location: '',
    // type_id: '1',
    work_date: '',
    work_hour: '1',
    pay_slip_image: "gooo"
  };

  handleChange = (label) => e => {
    console.log(e.target.value);
    this.setState({
      [label]: e.target.value,
    })
  };

  handleSelectCondo = (value) => {
    console.log(value);
    this.setState({
      type_id: value,
    })
  };

  handleSelectHour = (value) => {
    console.log(value);
    this.setState({
      work_hour: value
    })
  };

  handleDatePicker = (value) => {
    console.log(value);
    this.setState({
      work_date: value,
    })
  };

  handleConfirm = (e) => {
    // , type_id
    const { customer_location, work_date, work_hour, pay_slip_image } = this.state
    const { maidId } = this.props;
    console.log({ customer_location, work_date, work_hour, pay_slip_image })
    axios.post(`/bookings/maids/${maidId}`, { customer_location, work_date, work_hour, pay_slip_image })
      .then(result => {
        this.props.history.push(`/maid/${maidId}`);
        this.props.onCancel(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
    const { TextArea } = Input;
    return (
      <Modal
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        className="ModalBooking-Top"
      >
        <Row type="flex" justify="center">
          <Card className="ModalBooking-Card">
            <Row className="ModalBooking-Margin" style={{ width: "100%" }}>
              <Col>
                <FaBook className="ModalBooking-icon" />
                <span className="ModalBooking-icon_font"> ModalBooking </span>
              </Col>
            </Row>

            <Row className="ModalBooking-Margin2" style={{ width: "100%" }}>
              <Col>
                <FaClock className="ModalBooking-iconClock" />
                <span className="ModalBooking_font"> Wait confirm from Maid</span>
              </Col>
            </Row>

            <Row
              className="ModalBooking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="ModalBooking_font" span={7} offset={1}>
                Category
              </Col>
              <Col span={16}>
                <Select
                  onChange={this.handleSelectCondo}
                  value={this.state.type_id}
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
              className="ModalBooking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="ModalBooking_font" span={7} offset={1}>
                Date
              </Col>
              <Col span={16}>
                <DatePicker
                  Format={'DD/MM/YYYY'}
                  Value={this.handleDatePicker}
                  format={dateFormatList}
                  style={{ width: "100%" }}
                  onChange={this.handleDatePicker}
                />
              </Col>
            </Row>

            <Row
              className="ModalBooking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="ModalBooking_font" span={7} offset={1}>
                Hour
              </Col>
              <Col span={16}>
                <Select
                  value={this.state.work_hour}
                  style={{ width: "100%" }}
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
              className="ModalBooking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="ModalBooking_font" span={7} offset={1}>
                Price
              </Col>
              <Col input span={16}>
                <Input style={{ width: "100%" }}
                />
              </Col>
            </Row>

            <Row
              className="ModalBooking-Margin"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col className="ModalBooking_font" span={7} offset={1}>
                location
              </Col>
              <Col className="ModalBooking_font" span={16}>
                Current address
              </Col>
            </Row>

            <Row
              className="ModalBooking-Margin2"
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
            <Row className="ModalBooking-Margin">
              <Col className="ModalBooking3_font" span={16} offset={8}>
                **โอนเงินเข้าบัญชี ธนาคารเอบี สาขาราชเทวี เลขที่บัญชี
                012-3-99999-0**
              </Col>
            </Row>

            <Row className="ModalBooking-Margin3">
              <Col className="ModalBooking_font" span={7} offset={1}>
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

            <Row className="ModalBooking-Margin2">
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={() => this.props.onCancel(false)} className="ModalBooking-CancelButton">Cancel</Button>
              </Col>
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button className="ModalBooking-ConfirmButton" onClick={this.handleConfirm}>confirm</Button>
              </Col>
            </Row>
          </Card>
        </Row>
        <div
          className="ModalBooking-Footer"
          type="flex"
          justify="center"
          align="middle"
        >
        </div>
      </Modal>
    );
  }
}

export default withRouter(Form.create({})(ModalBooking));
