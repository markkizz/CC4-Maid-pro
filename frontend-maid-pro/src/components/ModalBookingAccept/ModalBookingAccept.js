import React from "react";
import "./ModalBookingAccept.css";
import { Modal, Button, Row, Col, Input, Rate } from "antd";

const { TextArea } = Input;

function ModalBookingAccept(props) {
  const { visible, onShowModal, onEmployerClickComplete, onChange, onChangeRate, bookingUser } = props;
  return (
    <Modal
      visible={visible}
      title="REVIEW"
      style={{ top: 10 }}
      onOk={onShowModal("acceptVisible")}
      onCancel={onShowModal("acceptVisible")}
      footer={[
        <Button
          type="flex"
          justify="center"
          key="1"
          className="BookingCard-submit"
          onClick={onEmployerClickComplete(bookingUser.target_data.id)}
        >
          Submit
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
      <Row type="flex" justify="center">
        <Col>
          <Rate
            allowHalf
            defaultValue={5}
            className="ReviewCard-Rate"
            onChange={onChangeRate}
          />
        </Col>
      </Row>
      <Row className="BookingCard-Cancel-Description">
        <Col span={24}>
          <TextArea rows={3} onChange={onChange("content")} />
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalBookingAccept;
