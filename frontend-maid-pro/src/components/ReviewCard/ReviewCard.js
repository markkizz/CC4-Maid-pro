import React from "react";
import { Row, Col, Card, Rate } from "antd";
import "./ReviewCard.css";
// ! Desc lenght cannot > 230 character

function ReviewCard(props) {

  return (
    <Card className="ReviewCard-Card" bodyStyle={{ padding: "6px 16px" }}>
      <Row type="flex" align="bottom">
        <Col span={12}>
          <Rate
            allowHalf
            defaultValue={props.review ? props.review.rating : 0}
            className="ReviewCard-Rate"
          />
        </Col>
        <Col span={6}>
          <p>12/12/12</p>
        </Col>
        <Col span={6}>
          <p>2020/2020</p>
        </Col>
      </Row>
      <Row className="ReviewCard-desc">
        <Col>
          <Card.Meta description={props.review ? props.review.content : ""} />
        </Col>
      </Row>
    </Card>
  );
}

export default ReviewCard;
