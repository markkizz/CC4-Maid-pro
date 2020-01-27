import React from "react";
import { Modal, Button, Row, Col, Input } from "antd";
import "./ModalBookingCancel.css";

const { TextArea } = Input;

function ModalBookingCancel(props) {
  const {
    visible,
    onShowModal,
    onMaidClickReject,
    onChange,
    bookingUser
  } = props;
  return (
    <Modal
      visible={visible}
      title="Cancel Booking"
      style={{ top: 10 }}
      onOk={onShowModal("cancelVisible")}
      onCancel={onShowModal("cancelVisible")}
      footer={[
        <Button key="1" type="danger" onClick={onMaidClickReject(bookingUser.employer_id)}>
          Send
        </Button>,
        <Button key="2" onClick={onShowModal("cancelVisible")}>
          Cancel
        </Button>
      ]}
    >
      <Row type="flex" justify="center">
        <Col>
          <p>
            <img
              src={bookingUser.target_data.profile_img}
              alt=""
              width="150"
              className="BookingCard-CancelBooking"
            />
          </p>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <h2>
            {bookingUser.target_data.first_name +
              " " +
              bookingUser.target_data.last_name}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="BookingCard-Cancel-Detial">
          <h3>ประเภทบ้าน :</h3>
        </Col>
        <Col span={12} className="BookingCard-Cancel-Detial">
          <h3>{bookingUser.building_type}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="BookingCard-Cancel-Hour">
          <h3>ชั่วโมง :</h3>
        </Col>
        <Col span={12} className="BookingCard-Cancel-Hour">
          <h3>{bookingUser.work_hour}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="BookingCard-Cancel-Hour">
          <h3>สถานที่ :</h3>
        </Col>
        <Col span={12} className="BookingCard-Cancel-Hour">
          <h3>{bookingUser.customer_location}</h3>
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
          // value={reason}
          onChange={onChange("reason")}
        />
      </Col>
    </Modal>
  );
}

export default ModalBookingCancel;
