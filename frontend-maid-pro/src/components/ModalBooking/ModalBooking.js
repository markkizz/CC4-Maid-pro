import React, { Component } from "react";
import "./ModalBooking.css";
import { withRouter, Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button, Icon, Form, Select, DatePicker, Upload, Modal, Checkbox } from "antd";
import { FaClock, FaBook } from "react-icons/fa";
import { connect } from 'react-redux'
import axios from '../../config/api.service'
import { openBookingSuccessNotification, openBookingFailedNotification } from './ModalBooking.noti';

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class ModalBooking extends Component {
  state = {
    visible: false,
    customerLocation: this.props.user,
    workDate: '',
    workHour: '1',
    price: 0,
    fileList: [],
    buildingTypeId: '',
    checkedCurrentAddress: false
  };

  handleChange = label => e => {
    this.setState({ [label]: e.target.value });
  }

  handleSelectWorkHour = value => {
    const calcPrice = this.props.maid.pricePerHour * value
    this.props.form.setFieldsValue({ price: calcPrice })
  }

  handleSelectBuildingType = async (value) => {
    await  this.setState({ buildingTypeId: value });
  };

  handleSelectWorkDate = (value) => {
    this.setState({ workDate: value });
  };

  handleCheckCurrentAddress = (e) => {
    const { form, user } = this.props;
    this.setState({ checkedCurrentAddress: e.target.checked });
    if (e.target.checked) {
      form.setFieldsValue({ location: user.address });
      this.setState({ customerLocation: user.address })
    } else {
      this.setState({ customerLocation: '' })
    }
  }

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
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { customerLocation, workDate, workHour, fileList, buildingTypeId } = this.state;
        console.log('customerLocation', customerLocation, JSON.stringify(customerLocation))
        const { maidId } = this.props;
        let data = new FormData();
        data.append("customerLocation", customerLocation);
        data.append("workDate", workDate);
        data.append("workHour", workHour);
        data.append("photo", fileList[0]);
        data.append("buildingTypeId", buildingTypeId)
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
            };
            openBookingFailedNotification(err.response.data.errorMessage);
          });
        this.setState({
          customerLocation: '',
          workDate: '',
          workHour: '',
          fileList: [],
          checkedCurrentAddress: false
        });
        form.resetFields();
      }
    });
  };

  render() {
    const { form, buildingServices, user } = this.props;
    const { checkedCurrentAddress } = this.state;
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
                <Col className="ModalBooking_font" span={7} offset={1}>Building Type</Col>

                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator('buildingType', {
                      rules: [{
                        required: true,
                        message: 'Please select Buidling Type!',
                      }]
                    })(<Select
                      onChange={this.handleSelectBuildingType}
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
                <Col className="ModalBooking_font" span={7} offset={1}>Date</Col>
                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator('workDate', {
                      rules: [{
                        required: true,
                        message: 'Please select Buidling Type!',
                      }]
                    })(
                      <DatePicker
                        Format={'DD/MM/YYYY'}
                        Value={this.handleDatePicker}
                        format={dateFormatList}
                        style={{ width: "100%" }}
                        onChange={this.handleSelectWorkDate}
                      />)}
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
                  Hour
                </Col>
                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator('workHour', {
                      rules: [{
                        required: true,
                        message: 'Please select Hour!',
                      }]
                    })(
                      <Select
                        value={this.state.workHour}
                        style={{ width: "100%" }}
                        onChange={this.handleSelectWorkHour}
                      >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                      </Select>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row
                className="ModalBooking-Margin"
                type="flex"
                justify="center"
                align="middle"
              >
                <Col className="ModalBooking_font" span={7} offset={1}>Price</Col>
                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator('price', {
                      rules: [{
                        required: true,
                        message: 'Price must not be empty'
                      }]
                    })(<Input disabled style={{ width: "100%", color: 'rgba(0, 0, 0, .5)' }} />)}
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
                  Location
                </Col>
                <Col className="ModalBooking_font" span={16}>
                  <Checkbox checked={checkedCurrentAddress} onChange={this.handleCheckCurrentAddress}>Current address</Checkbox>
                </Col>
              </Row>

              <Row
                className="ModalBooking-Margin2"
                type="flex"
                justify="center"
                align="middle"
              >
                <Col span={16} offset={8}>
                  <Form.Item>
                    {form.getFieldDecorator('location', {
                      rules: [{
                        required: true,
                        message: 'do not change!'
                      }]
                    })(
                      <TextArea
                        disabled={checkedCurrentAddress}
                        style={{ width: "100%", color: 'rgba(0, 0, 0, 0.65)' }}
                        className="Bookbank_font"
                        rows={2}
                        // placeholder="or not current address please enter your address"
                        onChange={this.handleChange('customerLocation')}
                      />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="ModalBooking-Margin">
                <Col className="ModalBooking3_font" span={16} offset={8}>
                  ดูช่องทางการชำระเงิน <Link to="/payment">ที่นี่</Link>
                </Col>
              </Row>

              <Row className="ModalBooking-Margin3">
                <Col className="ModalBooking_font" span={7} offset={1}>Pay Slip Image</Col>
                <Col span={16} style={{ width: "10%" }}>
                  <Form.Item>
                    {form.getFieldDecorator('file', {
                      rules: [{
                        required: true,
                        message: 'Please select Pay Slip Image'
                      }]
                    }
                    )(
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
                </Col>
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

const mapStateToProps = (state) => ({
  user: state.user
})

const FormBooking = Form.create({name: 'ModalBooking'})(ModalBooking);
const ConnectFormBooking = connect(mapStateToProps, null)(FormBooking)
export default withRouter(ConnectFormBooking);