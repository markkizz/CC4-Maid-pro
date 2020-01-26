import React, { Component } from "react";
import { connect } from 'react-redux'
import "./MaidDescription.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Row, Col, Button, Rate } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";
import ModalBooking from "../../components/ModalBooking/ModalBooking";
import axios from "../../config/api.service";
import { withRouter } from 'react-router-dom';
import { GiBroom } from "react-icons/gi";

class MaidDescription extends Component {
  state = {
    maidData: [],
    visible: false,
    maid: {
      buildingServices: [],
      type: '',
      reviewedMaids: []
    }
  };

  componentDidMount = async () => {

    const { match } = this.props;
    const { maidId } = match.params;
    try {
      const result = (await axios.get(`/users/maids/${maidId}`)).data;
      this.setState({ maid: result })
    } catch (ex) {
      console.error(ex.message);
    }
  };
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = e => {
    this.setState({ visible: false, });
  };

  isServiceType = (servicesList, type) => {
    let flag = false;
    servicesList.map(service => {
      if (service.type.startsWith(type)) {
        flag = true
      }
    });
    return flag
  };

  render() {
    const { maid } = this.state;
    return (
      <div>
        <Navbar />
        <Row>
          <Col>
            <Row className="MaidDescription-Profile">
              <Col span={11}>
                <Row type="flex" justify="end">
                  <img
                    src={maid.profileImg}
                    alt=""
                    width="150"
                    className="MaidDescription-ProfilePicture"
                  />
                </Row>
              </Col>
              <Col span={13} className="MaidDescription-Name">
                <h2>{maid.firstName} {maid.lastName}</h2>
                <h3>
                  <Rate
                    allowHalf
                    value={maid.averageRating}
                    className="MaidDescription-Rate"
                  />
                </h3>
                <h3>{maid.averageRating}</h3>
              </Col>
            </Row>
            <Row
              type="flex"
              justify="center"
              className="MaidDescription-DescriptionRow"
            >
              <Col span={20} className="MaidDescription-Description">
                <Row>Description</Row>
                <Row>
                  {maid.aboutMaid}
                </Row>
              </Col>
            </Row>
            <Row
              type="flex"
              justify="center"
              className="MaidDescription-MarginTop20px"
            >
              <h3>Type Of Place</h3>
            </Row>
            <Row>
              {this.isServiceType(maid.buildingServices, "คอนโด") && (
                <Col span={12} className="MaidDescription-Type">
                  <FaBuilding className="MaidDescription-icon" />
                  <h5 className="MaidDescription-CondoText">Condo</h5>
                </Col>
              )}
              <Col span={12} className="MaidDescription-CondoType">
                {maid.buildingServices.map((buildingService, idx) => (
                  buildingService.type.startsWith("คอนโด") && (
                    <h5 key={idx}><GiBroom /> {buildingService.type}</h5>
                  )
                ))}
              </Col>
            </Row>

            <Row>
              {this.isServiceType(maid.buildingServices, "บ้าน") && (
                <Col span={12} className="MaidDescription-Type">
                  <FaHome className="MaidDescription-icon" />
                  <h5 className="MaidDescription-HomeText">Home</h5>
                </Col>
              )}
              <Col span={12} className="MaidDescription-HomeType">
                {maid.buildingServices.map(buildingService => (
                  buildingService.type.startsWith("บ้าน") && (
                    <h5 key={maid.id}><GiBroom /> {buildingService.type}</h5>
                  )
                ))}
              </Col>
            </Row>
            <Row className="MaidDescription-BookingButtonforview">
              <Col span={24} className="MaidDescription-Booking">
                Price {maid.pricePerHour} Price/Hour
              </Col>
              <Button
                className="MaidDescription-BookingButton"
                onClick={this.showModal}
              >
                Booking
              </Button>
              <ModalBooking buildingServices={maid.buildingServices} maidId={maid.id} visible={this.state.visible} onCancel={this.handleCancel} />
              <Col span={24} className="MaidDescription-Booking">
                <h4>REVIEWS</h4>
              </Col>
            </Row>
          </Col>
        </Row>
        {maid.reviewedMaids.map(review => (
          <Row key={review.id} type="flex" justify="center">
            <Col className="MaidDescription-center">
              <ReviewCard review={review.review} />
            </Col>
          </Row>
        ))}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    maidId: state.maid.selectedMaid
  }
};


const connectMaidDescription = connect(mapStateToProps, null)(MaidDescription);

export default withRouter(connectMaidDescription);