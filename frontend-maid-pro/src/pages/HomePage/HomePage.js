import React, { Component } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import Footer from "../../components/Footer/Footer";
import { Carousel, Row, Col, Button } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";
import axios from "../../config/api.service";
import { dispatch } from "rxjs/internal/observable/range";
import { quickSearchType, selectedMaid } from "../../redux/actions/actions";
import { connect } from "react-redux";

export class HomePage extends Component {
  state = {

    imageUrls: [
      "https://architecturesideas.com/wp-content/uploads/2019/12/Housekeeper2.jpg",
      "https://architecturesideas.com/wp-content/uploads/2019/12/Housekeeper2.jpg"
    ],
    topMaids: []
  };

  componentDidMount() {
    axios.get("/users/maids?limit=6").then(result => {
      this.setState({
        topMaids: result.data
      });
    });
  }

  handleClickQuickSearch = serviceType => {
    dispatch(quickSearchType(serviceType));
    this.history.push(`/search/quicksearch`);
  };

  // handleClickMaid = maidId = () => {
  //   dispatch(selectedMaid(maidId));
  //   this.props.history.push(`/maid/${maidId}`);
  // };

  render() {
    const { imageUrls, topMaids } = this.state;
    return (
      <div>
        <Navbar />
        <Row>
          <Col>
            <Row type="flex" justify="center">
              <Col span={24}>
                <Carousel autoplay>
                  {imageUrls.map((url, i) => (
                    <div key={i + " Carousel"}>
                      <img src={url} alt="Carousel" className="HomePage-Carousel" />
                    </div>
                  ))}
                </Carousel>
              </Col>
            </Row>



            <Row type="flex" justify="center">
              <h2>Services</h2>
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
              <h2> Maid Recommended For You </h2>
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

const mapDispatchToProps = dispatch => {
  return {
    quickSearchType: (serviceType) => dispatch(quickSearchType(serviceType)),
    selectedMaid: (maidId) => dispatch(selectedMaid(maidId))
  };
};

export default connect(null, mapDispatchToProps)(HomePage)
