import React, { Component } from "react";
import "./ModalBooking.css";
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Input, Button, Icon, Form, Select, DatePicker, Upload, Modal } from "antd";
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
    fileList: [],
    buildingTypeId: ''
  };

  handleChange = label => e => {
    this.setState({ [label]: e.target.value });
  };

  handleSelectBuildingType = (value) => {
    this.setState({ buildingTypeId: value });
  };

  handleSelectHour = (value) => {
    this.setState({ workHour: value });
  };

  handleSelectWorkDate = (value) => {
    this.setState({ workDate: value });
  };

  handleBeforeUpload = file => {
    this.setState(state => ({ fileList: [file] }));
    return false;
  };

  handleRemoveUpload = () => {
    this.setState(state => ({ fileList: [] }));
    return false;
  };

  handleConfirm = (e) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll();

    const { customerLocation, workDate, workHour, fileList, buildingTypeId } = this.state;
    const { maidId } = this.props;
    let data = new FormData();
    data.append("customerLocation", customerLocation);
    data.append("workDate", workDate);
    data.append("workHour", workHour);
    data.append("photo", fileList[0]);
    data.append('buildingTypeId', buildingTypeId);
    axios.post(`/bookings/maids/${maidId}`, data)
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
    this.setState({
      customerLocation: '',
      workDate: '',
      workHour: '',
      fileList: [],
    });
    form.resetFields();
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
                  Building Type
                </Col>

                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator('buildingType', {
                      rules: [{
                        required: true,
                        message: 'Please select Buidling Type!',
                      }]
                    })(<Select
                      onChange={this.handleSelectBuildingType}
                      value={this.state.type_id}
                      style={{ width: "100%" }}
                    >{
                      buildingServices && buildingServices.map(service => (
                        <Option key={service.id} value={service.id}>
                          {service.type}
                        </Option>
                      ))
                    }</Select>)}
                  </Form.Item>
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
                    format={dateFormatList}
                    style={{ width: "100%" }}
                    onChange={this.handleSelectWorkDate}
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
                      <Upload
                        accept=".jpg,.jpeg"
                        beforeUpload={this.handleBeforeUpload}
                        onRemove={this.handleRemoveUpload}
                        fileList={this.state.fileList}
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
                <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => this.props.onCancel(false)} className="ModalBooking-CancelButton">
                    Cancel
                  </Button>
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
        <div className="ModalBooking-Footer" type="flex" justify="center" align="middle">
        </div>
      </Modal>
    );
  }
}

export default withRouter(Form.create({})(ModalBooking));
