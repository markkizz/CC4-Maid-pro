import React from "react";
import "./ModalBookingAccept.css";
import { Modal, Button, Row, Col, Input } from "antd";

function ModalBookingAccept() {
  return (
    <Modal
      visible={this.state.modal1Visible}
      title="REVIEW"
      style={{ top: 10 }}
      onOk={() => this.setModal1Visible(false)}
      onCancel={() => this.setModal1Visible(false)}
      footer={[
        <Button
          type="flex"
          justify="center"
          key="1"
          className="BookingCard-submit"
          onClick={this.handleSubmit}
        >
          Submit
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
      <Row type="flex" justify="center">
        <Col>
          <Rate
            allowHalf
            defaultValue={5}
            className="ReviewCard-Rate"
            onChange={this.handleChange("rating")}
          />
        </Col>
      </Row>
      <Row className="BookingCard-Cancel-Description">
        <Col span={24}>
          <TextArea rows={3} onChange={this.handleChange("content")} />
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalBookingAccept;
