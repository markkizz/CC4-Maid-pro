import React from "react";
import PropTypes from "prop-types";
import "./MaidCardWeb.css";
import { Row, Col, Card, Rate } from "antd";

function MaidCardWeb(props) {
  const { maid } = props;
  return (
    <Card
      className="MaidCard-card"
      style={{ width: 545, height: 330 }}
      bodyStyle={{ padding: 0 }}
    >
      <Row type="flex">
        <Col>
          <img className="height" src={maid.profile_img} alt="maid" />
        </Col>
        <Col span={12} push={1}>
          <Row className="description">
            <h3 style={{ fontSize: 25 }}>
              {maid.first_name} {maid.last_name}
            </h3>
          </Row>
          <Row className="MaidCard-Row" style={{ display: "flex" }}>
            <Col>
              <Rate
                allowHalf
                disabled
                defaultValue={maid.average_rating}
                className="MaidCard-Rate"
                style={{ fontSize: 30, paddingTop: 2 }}
              />
            </Col>
            <Col>
              <p
                className="MaidCard-p"
                style={{ paddingTop: 19, fontSize: 18 }}
              >
                ({maid.number_of_reviews})
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Meta
                style={{ paddingTop: 19, fontSize: 20 }}
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
