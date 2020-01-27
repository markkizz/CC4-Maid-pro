import React from "react";
import PropTypes from "prop-types";
import "./MaidCardWeb.css";
import { Row, Col, Card, Rate } from "antd";

function MaidCardWeb(props) {
  const { maid } = props;
  return (
    <Card
      className="MaidCardWeb-card"
      style={{ width: 385, height: 185 }}
      bodyStyle={{ padding: 0 }}
    >
      <Row type="flex">
        <Col>
          <img className="height" src={maid.profile_img} alt="maid" />
        </Col>
        <Col span={12} push={1}>
          <Row className="description">
            <h3 style={{ fontSize: 22, paddingTop: 5 }}>
              {maid.first_name} {maid.last_name}
            </h3>
          </Row>
          <Row className="MaidCardWeb-Row" style={{ display: "flex" }}>
            <Col>
              <Rate
                allowHalf
                disabled
                defaultValue={maid.average_rating}
                className="MaidCardWeb-Rate"
                style={{ fontSize: 18 }}
              />
            </Col>
            <Col className="MaidCardWeb-center">
              <p
                className="MaidCardWeb-p"
                style={{fontSize: 14 }}
              >
                {`(${maid.number_of_reviews})`}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Meta
                style={{ paddingTop: 19, fontSize: 16 }}
                description={maid.about_maid.substr(0, 45) + "..."}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

MaidCardWeb.propTypes = {
  maidName: PropTypes.string,
  src: PropTypes.string,
  rating: PropTypes.number,
  totalReview: PropTypes.number,
  desc: PropTypes.string
};

export default MaidCardWeb;
