import React, { Component } from "react";
import { connect } from 'react-redux'
import "./MaidDescription.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Row, Col, Button, Rate } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";
import Booking from "../Booking/Booking";
import axios from "../../config/api.service"

class MaidDescription extends Component {
  state = {
    maidData: [],
    visible: false,
    maid: {
      buildingServices: [],
      type: '',
      reviewedMaids: []
    }
  }

  componentDidMount = async () => {
    console.log(this.props)
    const maidId = this.props.maidId
    // const result = await axios.get(`/users/maids/${maidId}`)
    try {
      const result = (await axios.get(`/users/maids/2`)).data
      this.setState({ maid: result })
    } catch (ex) {
      console.error(ex.message)
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { maid } = this.state
    console.log(maid.reviewedMaids)
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
                    defaultValue={maid.averageRating}
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
              <Col span={12} className="MaidDescription-Type">
                <FaBuilding className="MaidDescription-icon" />
                <h5 className="MaidDescription-CondoText">Condo</h5>
              </Col>
              <Col span={12} className="MaidDescription-CondoType">
                {maid.buildingServices.map(buildingService => (
                  buildingService.type.startsWith("คอนโด") && (
                    <h5 key={maid.id}>{"<"} {buildingService.type}</h5>
                  )
                ))}
              </Col>
            </Row>
            <Row>
              <Col span={12} className="MaidDescription-Type">
                <FaHome className="MaidDescription-icon" />
                <h5 className="MaidDescription-HomeText">Home</h5>
              </Col>
              <Col span={12} className="MaidDescription-HomeType">
                {maid.buildingServices.map(buildingService => (
                  buildingService.type.startsWith("บ้าน") && (
                    <h5 key={maid.id}>{"<"} {buildingService.type}</h5>
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
              <Booking visible={this.state.visible} onCancel={this.handleCancel} />
              <Col span={24} className="MaidDescription-Booking">
                <h4>REVIEWS</h4>
              </Col>
            </Row>
          </Col>
        </Row>
        {maid.reviewedMaids.map(review => (
          <Row type="flex" justify="center">
            <Col className="MaidDescription-center">
              <ReviewCard review={review.review}/>
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
}

export default connect(mapStateToProps, null)(MaidDescription)