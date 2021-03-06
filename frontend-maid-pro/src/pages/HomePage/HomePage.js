import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMaids, quickSearchType, selectedMaid } from '../../redux/actions/actions';
import axios from '../../config/api.service';
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import MaidCard from '../../components/MaidCard/MaidCard';
import Footer from '../../components/Footer/Footer';
import { Carousel, Row, Col, Button } from "antd";
import { FaBuilding, FaHome } from 'react-icons/fa';
import Carousel1 from '../../images/Carousel1.jpeg';
import Carousel2 from '../../images/Carousel2.jpg';
import Carousel3 from '../../images/Carousel3.jpg';
import MaidCardWeb from '../../components/MaidCardWeb/MaidCardWeb';
import { handleError } from '../../utils/error-handler';

export class HomePage extends Component {
  _isMounted = false;
  state = {
    imageUrls: [
      Carousel1,
      Carousel2,
      Carousel3
    ],
    topMaids: [],
    mobileScreen: false,
    isLoading: true
  };

  componentDidMount = async () => {
    this._isMounted = true;
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    try {
      const { data } = await axios.get('/users/maids?limit=6');
      if (this._isMounted) {
        this.setState({ topMaids: data, isLoading: false });

      }
    } catch (err) {
      const error = handleError(err);
      console.error('Error ❌ ', error.status, error.message);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickQuickSearch = async serviceType => {
    this.props.quickSearchType(serviceType);
    this.props.history.push(`/search/quicksearch`);
  };

  resize = () => {
    let isMobileScreen = window.innerWidth <= 767;
    if (isMobileScreen !== this.state.mobileScreen) {
      this.setState({
        mobileScreen: isMobileScreen,
      });
    }
  };

  render() {
    const { imageUrls, topMaids, mobileScreen } = this.state;
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
                  <Button onClick={() => this.handleClickQuickSearch('condo')} className="HomePage-ServiceButtons">
                    <Col className="HomePage-ButtonIconColumn">
                      <FaBuilding className="HomePage-ButtonColumnIcon" />
                    </Col>
                    <Col>Condo</Col>
                  </Button>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="start">
                  <Button onClick={() => this.handleClickQuickSearch('home')} className="HomePage-ServiceButtons">
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
                <Col key={maid.id} xs={12} xl={8}>
                  <Row type="flex" justify="center" align="middle" style={{ marginBottom: "20px" }}>
                    <Col>
                      {mobileScreen ? <MaidCard maid={maid} /> : <MaidCardWeb maid={maid} />}
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
    selectedMaid: (maidId) => dispatch(selectedMaid(maidId)),
    fetchMaids: () => dispatch(fetchMaids())
  };
};

export default connect(null, mapDispatchToProps)(HomePage)
