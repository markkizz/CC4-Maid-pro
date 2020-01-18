import React, { Component } from 'react'
import './MaidDescription.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { Row, Col, Button, Rate } from "antd";
import { FaBuilding, FaHome } from "react-icons/fa";
export default class MaidDescription extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Row>
          <Col>
            <Row className='MaidDescription-Profile'>
              <Col span={12} >
                <img src="JessicaSpencer.png" alt='' width='150' className='MaidDescription-ProfilePicture' />
              </Col>
              <Col span={12} className='MaidDescription-Name'>
                <h2>Jessica Spencer</h2>
                <h3>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={5}
                    className="MaidDescription-Rate"
                  />
                  </h3>
                <h3>4.0</h3>
              </Col>
            </Row>
            <Row className='MaidDescription-Description-bgColor'>
              <Col type= 'flex' justify='center' className='MaidDescription-Description'>
                <h3 className='MaidDescription-Description'>
                  Description
                </h3>
                <Row>
                  <Col>
                    Jessica SpencerDescriptionDescriptionDes criptionDescriptionDescriptionDescript ionDescriptionDescript iononDescriptionDescriptionDescriptionDescript ionDescr
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='MaidDescription-TypeOfPlace'>
              <Col span={12}>
                <h3>Type Of Place</h3>
                <br />
                <FaBuilding className="MaidDescription-icon" />
                <h5>Condo</h5>
                <br />
                <FaHome className="MaidDescription-icon" />
                <h5>Home</h5>

              </Col>
              <Col span={12} className="MaidDescription-Type">
                <br />
                <h5>40 Sq.m.</h5>
                <h5>50 Sq.m.</h5>
                <h5>80 Sq.m.</h5>
                <h5>100 Sq.m.</h5>
                <br />
                <h5>100 Sq.m.</h5>
                <h5>100-200 Sq.m.</h5>
                <h5>200 Sq.m.</h5>
              </Col>
            </Row>
            <Row className='MaidDescription-BookingButtonforview'>
              <Col span={24}className='MaidDescription-Booking'>Price 250 Price/Hour</Col>
              <Button className="MaidDescription-BookingButton">Booking</Button>
              <Col span={24}className='MaidDescription-Booking'>
              <h4>REVIEW</h4>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row type= 'flex' justify='center'>
        <Col className='MaidDescription-center'><ReviewCard /></Col>
        </Row>
        <Row type= 'flex' justify='center'>
        <Col className='MaidDescription-center'><ReviewCard /></Col>
        </Row>
        <Row type= 'flex' justify='center'>
        <Col className='MaidDescription-center'><ReviewCard /></Col>
        </Row>
        <Footer />
      </div>
    )
  }
}
