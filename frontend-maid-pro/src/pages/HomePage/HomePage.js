import React, { Component } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import Footer from "../../components/Footer/Footer";
import { Carousel, Row, Col, Button } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";
import axios from "../../config/api.service";
import { fetchMaids, quickSearchType, selectedMaid } from "../../redux/actions/actions";
import { connect } from "react-redux";
import Carousel1 from '../../images/Carousel1.jpeg'
import Carousel2 from '../../images/Carousel2.jpg'
import Carousel3 from '../../images/Carousel3.jpg'

export class HomePage extends Component {
  state = {
    imageUrls: [
      Carousel1,
      Carousel2,
      Carousel3
    ],
    topMaids: []
  };

  componentDidMount = async () => {
    this.setState({ topMaids: (await axios.get('/users/maids?limit=6')).data });
  };

  handleClickQuickSearch = serviceType => {
    this.history.push(`/search/quicksearch`);
  };

  render() {
    const { imageUrls, topMaids } = this.state;
    return (
      <div>
        <Navbar />
        <Row>
          <Col>
            <Row type="flex" justify="center">
              <Col span={24} className="HomePage-Carousel">
                <Carousel autoplay>
                  {imageUrls.map((url, i) => (
                    <img key={i + "Carousel"} src={url} alt="Carousel" className="HomePage-CarouselImage" />
                  ))}
                </Carousel>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <h2 className="HomePage-HeaderText">Services</h2>
            </Row>
            <Row>
              <Col span={12}>
                <Row type="flex" justify="end">
                  <Button className="HomePage-ServiceButtons">
                    <Col className="HomePage-ButtonIconColumn">
                      <FaBuilding className="HomePage-ButtonColumnIcon" />
                    </Col>
                    <Col>Condo</Col>
                  </Button>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="start">
                  <Button className="HomePage-ServiceButtons">
                    <Col className="HomePage-ButtonIconColumn">
                      <FaHome className="HomePage-ButtonColumnIcon" />
                    </Col>
                    <Col>Home</Col>
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <h2 className="HomePage-HeaderText">Maid Recommended For You</h2>
            </Row>


            <Row>
              {topMaids.map(maid => (
                <Col key={maid.id} span={12}>
                  <Row type="flex" justify="center" align="middle" style={{ marginBottom: "20px" }}>
                    <Col>
                      <MaidCard maid={maid} />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>


          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    topMaids: state.maids
  }
};

const mapDispatchToProps = dispatch => {
  return {
    quickSearchType: (serviceType) => dispatch(quickSearchType(serviceType)),
    selectedMaid: (maidId) => dispatch(selectedMaid(maidId)),
    fetchMaids: () => dispatch(fetchMaids())
  };
};

export default connect(null, mapDispatchToProps)(HomePage)
