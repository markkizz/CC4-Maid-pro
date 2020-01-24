import React from "react";
import { Row, Col, Button } from "antd";
import { FaRegClock, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import './DisplayStatus.css';

function MainComponent(props) {
  let Component
  const {status, type} = props
  if(status === "WAIT_FOR_ACCEPTANCE" && type === 'EMPLOYER'){
    Component = RenderWaitingForAccept
  } else if(status === "WAIT_FOR_ACCEPTANCE" && type === 'MAID') {
    Component = RenderCustomerRequest
  } else if(status === "ACCEPT" && type==='MAID') {
    Component = RenderAccept
  } else if(status === "ACCEPT" && type==='EMPLOYER') {
    Component = RenderIsCleaningComplete
  } else if(status === "REJECT") {
    Component = RenderReject
  } else if(status === "FINISHED") {
    Component = RenderComplete
  }
  return (
    <Component />
  );
}

export default MainComponent;

// employer
// * CanRefactor
const RenderWaitingForAccept = () => (
  <Row type="flex" align="middle" gutter={[8, 16]}>
    <Col>
      <FaRegClock className="DisplayStatus-Wait"/>
    </Col>
    <Col className="DisplayStatus-p">
      <p>Waiting for request</p>
    </Col>
  </Row>
);

const RenderIsCleaningComplete = () => (
  <Row type="flex">
    <Col span={12}>
      <Row type="flex" align="middle">
        <Col span={4}>
          <FaRegClock className="DisplayStatus-Wait"/>
        </Col>
        <Col className="DisplayStatus-p" span={20}>
          <p>Wait for cleaning</p>
        </Col>
      </Row>
    </Col>
    <Col span={12}>
      <Row type="flex" justify="end" style={{marginRight: 10}}>
        <Button
          className="BookingCard-Accept"
          // onClick={this.showModal("acceptVisible")}
        >
          Complete
        </Button>
      </Row>
    </Col>
  </Row>
);
// when maid reject your job
const RenderReject = () => (
  <Row type="flex" align="middle" gutter={[8, 16]}>
    <Col>
      <FaRegTimesCircle className="DisplayStatus-Cancel" />
    </Col>
    <Col className="DisplayStatus-p">
      <p>Reject Booking</p>
    </Col>
  </Row>
)

// maid
const RenderCustomerRequest = () => (
  <Row type="flex" justify="end" className="BookingCard-BodyBottom" style={{marginRight: 10}}>
    <Button
      className="BookingCard-Cancel"
      // onClick={this.showModal("cancelVisible")}
    >
      Cancel
    </Button>
    <Button
      className="BookingCard-Accept"
      // onClick={this.showModal("acceptVisible")}
    >
      Accept
    </Button>
  </Row>
);

// * CanRefactor
// when user cancel job
const RenderCancel = () => (
  <Row type="flex" align="middle" gutter={[8, 16]}>
    <Col>
      <FaRegTimesCircle className="DisplayStatus-Cancel" />
    </Col>
    <Col className="DisplayStatus-p">
      <p>Cancel Job</p>
    </Col>
  </Row>
)

// * CanRefactor
const RenderAccept = () => (
  <Row type="flex" align="middle" gutter={[8, 16]}>
    <Col>
      <FaRegCheckCircle className="DisplayStatus-Complete" />
    </Col>
    <Col className="DisplayStatus-p">
      <p>Accept</p>
    </Col>
  </Row>
);

// both
// * CanRefactor
const RenderComplete = () => (
  <Row type="flex" align="middle" gutter={[8, 16]}>
    <Col>
      <FaRegCheckCircle className="DisplayStatus-Complete" />
    </Col>
    <Col className="DisplayStatus-p">
      <p>Cleaning Complete</p>
    </Col>
  </Row>
);

// const waitingForCompleteCleaning = (

// )
