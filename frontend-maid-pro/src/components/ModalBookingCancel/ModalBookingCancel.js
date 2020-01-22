import React from "react";
import { Modal, Button, Row, Col, Input } from "antd";
import './ModalBookingCancel.css'

const {TextArea} = Input

function ModalBookingCancel() {
  return (
    <Modal
      visible={visible}
      title="Cancel Booing"
      style={{ top: 10 }}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
        <Button key="1" type="danger" onClick={this.handleSubmit}>
          Send
        </Button>,
        <Button key="2" onClick={this.handleCancel}>
          Cancel
        </Button>
      ]}
    >
      <Row type="flex" justify="center">
        <Col>
          <p>
            <img
              src="JessicaSpencer.png"
              alt=""
              width="150"
              className="BookingCard-CancelBooking"
            />
          </p>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <h2>Jessica Spencer</h2>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="BookingCard-Cancel-Detial">
          <h3>ประเภทบ้าน :</h3>
        </Col>
        <Col span={12} className="BookingCard-Cancel-Detial">
          <h3>คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)</h3>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="BookingCard-Cancel-Hour">
          <h3>ชั่วโมง :</h3>
        </Col>
        <Col span={12} className="BookingCard-Cancel-Hour">
          <h3>2</h3>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="BookingCard-Cancel-Hour">
          <h3>สถานที่ :</h3>
        </Col>
        <Col span={12} className="BookingCard-Cancel-Hour">
          <h3>472/10 ถนนรองเมือง แขวงรองเมือง เขตปทุมวัน กทม 10330</h3>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <h3>Description</h3>
        </Col>
      </Row>
      <Col span={24} style={{ marginBottom: "10px" }}>
        <TextArea
          rows={3}
          value={this.state.reason}
          onChange={this.handleChange("reason")}
        />
      </Col>
    </Modal>
  );
}

export default ModalBookingAccept;
