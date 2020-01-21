import React from "react";
import PropTypes from "prop-types";
import "./MaidCard.css";
import { Row, Col, Card, Rate } from "antd";

function MaidCard(props) {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque iste, laboriosam adipisci voluptatem dolor quod " +
    "ipsa nulla sint corrupti tempore laborum a assumenda officia consectetur reprehenderit vitae? Beatae, ad autem.";
  const { maid } = props;
  return (
    <Card className="MaidCard-card" bodyStyle={{ padding: "6px 10px" }}
          cover={
            <img
              src="https://img.favpng.com/1/17/0/maid-service-cleaner-cleaning-housekeeping-png-favpng-hHyK6AM2eL1YXmKj8YJWLxE9d.jpg"
              alt="maid"
            />
          }
    >
      <h3>{maid.first_name} {maid.last_name}</h3>
      <Row className="MaidCard-Row" type="flex" align="bottom">
        <Col span={16}>
          <Rate allowHalf disabled defaultValue={maid.average_rating} className="MaidCard-Rate" />
        </Col>
        <Col span={6}>
          <p className="MaidCard-p">(555)</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Meta
            style={{ fontSize: 12 }}
            description={maid.about_maid.substr(0, 45) + "..."}
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
