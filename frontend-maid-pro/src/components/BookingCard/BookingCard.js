import React, { Component } from 'react'
import './BookingCard.css'
import { Row, Col, Divider, Button, Modal, Input, Rate } from 'antd'
import { FaMapMarkerAlt } from "react-icons/fa";
const { TextArea } = Input;
export default class BookingCard extends Component {
  state = {
    loading: false,
    visible: false,
    modal1Visible: false,
  };

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
          <Modal
            visible={visible}
            title="Cancel Booing"
            style={{ top: 10 }}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="1" type="danger">Send</Button>,
              <Button key="2" onClick={this.handleCancel}>Cancel</Button>,
            ]}
          >
            <Row type='flex' justify='center' >
              <Col><p><img src="JessicaSpencer.png" alt='' width='150' className='BookingCard-CancelBooking' /></p></Col>
            </Row>
            <Row type='flex' justify='center'>
              <Col><h2>Jessica Spencer</h2></Col>
            </Row>
            <Row >
              <Col span={8} className='BookingCard-Cancel-Detial'>
                <h3>ประเภทบ้าน :</h3>
              </Col>
              <Col span={12} className='BookingCard-Cancel-Detial'>
                <h3>คอนโด 1 ห้องนอน  (ไม่เกิน 40 ตร.ม.)</h3>
              </Col>
            </Row>
            <Row >
              <Col span={8} className='BookingCard-Cancel-Hour'>
                <h3>ชั่วโมง :</h3>
              </Col>
              <Col span={12} className='BookingCard-Cancel-Hour'>
                <h3>2</h3>
              </Col>
            </Row>
            <Row >
              <Col span={8} className='BookingCard-Cancel-Hour'>
                <h3>สถานที่ :</h3>
              </Col>
              <Col span={12} className='BookingCard-Cancel-Hour'>
                <h3>472/10 ถนนรองเมือง แขวงรองเมือง เขตปทุมวัน กทม 10330</h3>
              </Col>
            </Row>
            <Row type='flex' justify='center'>
              <Col ><h3>Description</h3></Col>
            </Row><Col span={24} style={{ marginBottom: '10px' }}><TextArea rows={3} /></Col>
          </Modal>
          <Modal
            visible={this.state.modal1Visible}
            title="REVIEW"
            style={{ top: 10 }}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
            footer={[
              <Button type='flex' justify='center' key="1" className="BookingCard-submit">Submit</Button>
            ]}
          >
            <Row type='flex' justify='center' >
              <Col><p><img src="JessicaSpencer.png" alt='' width='150' className='BookingCard-CancelBooking' /></p></Col>
            </Row>
            <Row type='flex' justify='center'>
              <Col><h2>Jessica Spencer</h2></Col>
            </Row>
            <Row type='flex' justify='center'>
              <Col>
                <Rate
                  allowHalf
                  defaultValue={5}
                  className="ReviewCard-Rate"
                />
              </Col>
            </Row>
            <Row className={'BookingCard-Cancel-Description'}>
              <Col span={24} ><TextArea rows={3} /></Col>
            </Row>
          </Modal>
        </Row>
      </div>
    )
  }
}
