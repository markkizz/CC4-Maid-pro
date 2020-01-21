import React, { Component } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import Footer from "../../components/Footer/Footer";
import { Carousel, Row, Col } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";

handleQuickSearchCondo = () => {
  dispatch(searchCondo())
  this.history.push('/search/quickCondo')
}

handleQuickSearchHome = () => {
  dispatch(searchHome())
  this.history.push('/search/quickSearch')
}

handle = serviceTypes => (e) => { 

}

handleClickMaid = (maidId) => {
  dispatch(maidIdTypes(maidId))
  this.history.push(`maid/${maidId}`)
}

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
        <div className="HomePage-container" >
          <Row type="flex" justify="center" className="HomePage-Carousel-container">
            <Col span={24} >
              <Carousel autoplay >
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
                    <FaBuilding className="HomaPage-icon" onClick={this.handleQuickSearchCondo('condo')}/>
                    <p>Condo</p>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="center" align="middle">
                  <Col className="HomePage-text-center HomePage-q-card">
                    <FaHome className="HomaPage-icon" onClick={this.handleQuickSearchHome}/>
                    <p>Home</p>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </div>
        <div>
          <Row type="flex" justify="center" style={{ marginTop: '20px'}}>
            <Col>
              <h2>Maid Recommended For You</h2>
            </Col>
          </Row>
          <div className="HomePage-margin" >
            <Col span={12}>
              <Row type="flex" justify="center" align="middle"style={{ marginBottom: '20px'}}>
                <Col >
                  <MaidCard />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="center" align="middle"style={{ marginBottom: '20px'}}>
                <Col >
                  <MaidCard />
                </Col>
              </Row>
            </Col>
          </div>
          <div className="HomePage-margin" >
            <Col span={12}>
              <Row type="flex" justify="center" align="middle"style={{ marginBottom: '20px'}}>
                <Col >
                  <MaidCard />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="center" align="middle"style={{ marginBottom: '20px'}}>
                <Col >
                  <MaidCard />
                </Col>
              </Row>
            </Col>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}


export default connect() (HomePage)
