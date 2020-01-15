import React, { Component } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import Footer from "../../components/Footer/Footer";
import { Carousel, Row, Col } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";
export class HomePage extends Component {
  state = {
    imageUrls: [
      "https://architecturesideas.com/wp-content/uploads/2019/12/Housekeeper1.jpg",
      "https://architecturesideas.com/wp-content/uploads/2019/12/Housekeeper2.jpg"
    ]
  };

  render() {
    const { imageUrls } = this.state;
    return (
      <>
        <Navbar />
        <div className="HomePage-Carousel-container">
          <Row type="flex" justify="center">
            <Col span={24}>
              <Carousel autoplay>
                {imageUrls.map((url, i) => (
                  <div key={i + " Carousel"}>
                    <img
                      src={url}
                      alt="Carousel"
                      className="HomePage-Carousel-img"
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </div>
        <div className="container HomePage-footer-margin">
          <Row>
            <Col style={{ marginTop: 20, textAlign: "center" }}>
              <h2>Services</h2>
            </Col>
            <div className="HomePage-margin">
              <Col span={12}>
                <Row type="flex" justify="center" align="middle">
                  <Col className="HomePage-text-center HomePage-q-card">
                    <FaBuilding className="HomaPage-icon" />
                    <p>Condo</p>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="center" align="middle">
                  <Col className="HomePage-text-center HomePage-q-card">
                    <FaHome className="HomaPage-icon" />
                    <p>Home</p>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
          <Row
            style={{ marginTop: 20 }}
            type="flex"
            justify="center"
            gutter={[16, 18]}
          >
            <Col span={24}>
              <div className="HomePage-text-center">
                <h2>Maid Recommended For You</h2>
              </div>
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
          </Row>
        </div>
        <Footer />
      </>
    );
  }
}

export default HomePage;
