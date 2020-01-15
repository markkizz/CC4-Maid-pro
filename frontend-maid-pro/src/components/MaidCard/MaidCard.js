import React from "react";
import PropTypes from "prop-types";
import "./MaidCard.css";
import { Row, Col, Card, Rate } from "antd";

function MaidCard() {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque iste, laboriosam adipisci voluptatem dolor quod ipsa nulla sint corrupti tempore laborum a assumenda officia consectetur reprehenderit vitae? Beatae, ad autem.";
  return (
    <Card
      className="MaidCard-card"
      cover={
        <img
          src="https://img.favpng.com/1/17/0/maid-service-cleaner-cleaning-housekeeping-png-favpng-hHyK6AM2eL1YXmKj8YJWLxE9d.jpg"
          alt="maid"
        />
      }
      bodyStyle={{ padding: "6px 10px" }}
    >
      <h3>Mark Maid</h3>
      <Row className="MaidCard-Row" type="flex" align="bottom">
        <Col span={16}>
          <Rate allowHalf disabled defaultValue={5} className="MaidCard-Rate" />
        </Col>
        <Col span={6}>
          <p className="MaidCard-p">(555)</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Meta
            style={{ fontSize: 12 }}
            description={description.substr(0, 45) + "..."}
          />
        </Col>
      </Row>
    </Card>
  );
}

MaidCard.propTypes = {
  maidName: PropTypes.string,
  src: PropTypes.string,
  rating: PropTypes.number,
  totalReview: PropTypes.number,
  desc: PropTypes.string
};

export default MaidCard;
