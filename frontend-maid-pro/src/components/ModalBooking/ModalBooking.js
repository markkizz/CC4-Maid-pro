import React, { Component } from "react";
import "./ModalBooking.css";
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Input, Button, Icon, Form, Select, DatePicker, Upload, Modal, message } from "antd";
import { FaClock, FaBook } from "react-icons/fa";
import axios from '../../config/api.service'
import { openBookingSuccessNotification, openBookingFailedNotification } from './ModalBooking.noti';

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class ModalBooking extends Component {
  state = {
    visible: false,
    customerLocation: '',
    workDate: '',
    workHour: '1',
    paySlipImage: "gooo"
  };

  handleChange = label => e => {
    this.setState({ [label]: e.target.value });
  };

  handleSelectCondo = (value) => {
    this.setState({ type_id: value });
  };

  handleSelectHour = (value) => {
    this.setState({ workHour: value });
  };

  handleDatePicker = (value) => {
    this.setState({ workDate: value });
  };

  handleBrowseImage = info =>  e => {
    console.log(e.target.value);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleConfirm = (e) => {
    const { customerLocation, workDate, workHour, paySlipImage } = this.state;
    const { maidId } = this.props;
    axios.post(`/bookings/maids/${maidId}`, { customerLocation, workDate, workHour, paySlipImage })
      .then(result => {
        this.props.history.push(`/maid/${maidId}`);
        this.props.onCancel(false);
        openBookingSuccessNotification('Your booking is successfully');
      })
      .catch(err => {
        console.error(err);
        if (err.response.data === 'Unauthorized') {
          openBookingFailedNotification('Please login before create booking');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('store');
          setTimeout(() => this.props.history.push('/login'), 1000);
          return;
        }
        openBookingFailedNotification(err.response.data.errorMessage);
      });
  };

  render() {
    const { form, buildingServices, dataset } = this.props;
    return (
      <Modal
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        className="ModalBooking-Top"
      >
        <Row type="flex" justify="center">
          <Card className="ModalBooking-Card">
            <Form>
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
                  >{
                    buildingServices && buildingServices.map(service => (
                      <Option key={service.id} value={service.id}>
                        {service.type}
                      </Option>
                    ))
                  }</Select>
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
                    value={this.state.workHour}
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
                  <Input style={{ width: "100%" }} />
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
                    onChange={this.handleChange('customerLocation')}
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
                  Pay Slip Image
                </Col>
                <Form.Item>
                  {form.getFieldDecorator('file', {
                    initialValue: dataset && dataset.filename ? dataset.filename : [],
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile
                  })(
                    <Col span={16} style={{ width: "10%" }}>
                      <Upload name="file" accept=".png,.jpg,.jpeg"
                              onChange={(info) => this.handleBrowseImage(info)}
                              headers={{ authorization: 'authorization-text' }}
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      >
                        <Button>
                          <Icon type="upload" /> Click to Upload
                        </Button>
                      </Upload>
                    </Col>
                  )}
                </Form.Item>
              </Row>

              <Row className="ModalBooking-Margin2">
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button onClick={() => this.props.onCancel(false)}
                          className="ModalBooking-CancelButton">Cancel</Button>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button className="ModalBooking-ConfirmButton" onClick={this.handleConfirm}>confirm</Button>
                </Col>
              </Row>
            </Form>
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
