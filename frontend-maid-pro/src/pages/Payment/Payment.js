import React, { Component } from 'react'
import './Payment.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Row, Col } from 'antd'
import KBANK from '../../images/KBANK.jpg'
import SCB from '../../images/SCB.jpg'
import BBL from '../../images/BBL.jpg'
import KTB from '../../images/KTB.jpg'


export default class Payment extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Row type="flex" justify="center" className="Payment-Content">
          <Col xs={22} sm={22} md={20} lg={18}>
            <Row type="flex" justify="center">
              <h1>Payment Methods</h1>
            </Row>
            <Row>
              <Col className="Payment-Instructions">
                <ul>
                  <li>Make sure the transfer amount matches the service cost.</li>
                  <li>Provide transaction evidence within 1 day after the transfer has been made.</li>
                </ul>
              </Col>
            </Row>
            <Row className="Payment-MarginBottomHalfRem">
              <span>1. Please choose one of the following banks to transfer</span>
            </Row>
            <Row>
              <Col>
               <Row type="flex" align="middle" className="Payment-BankTableRow">
                 <Col span={2}>
                   <img src={KBANK} alt="" width="100%" className="Payment-BankLogo" />
                 </Col>
                 <Col span={14}>
                   <Row className="Payment-BankNameKBank">Kasikornbank</Row>
                   <Row>Siam Paragon Branch</Row>
                 </Col>
                 <Col span={8}></Col>
               </Row>
               <Row type="flex" align="middle" className="Payment-BankTableRow">
                 <Col span={2}>
                   <img src={SCB} alt="" width="100%" className="Payment-BankLogo" />
                 </Col>
                 <Col span={14}>
                   <Row className="Payment-BankNameSCB">Siam Commercial Bank</Row>
                   <Row>Bangrak Branch</Row>
                 </Col>
                 <Col span={8}></Col>
               </Row>
               <Row type="flex" align="middle" className="Payment-BankTableRow">
                 <Col span={2}>
                   <img src={BBL} alt="" width="100%" className="Payment-BankLogo" />
                 </Col>
                 <Col span={14}>
                   <Row className="Payment-BankNameBBL">Bangkok Bank</Row>
                   <Row>Ploen Chit Branch</Row>
                 </Col>
                 <Col span={8}></Col>
               </Row>
               <Row type="flex" align="middle" className="Payment-BankTableRow Payment-LastTableRow">
                 <Col span={2}>
                   <img src={KTB} alt="" width="100%" className="Payment-BankLogo" />
                 </Col>
                 <Col span={14}>
                   <Row className="Payment-BankNameKTB">Krungthai Bank</Row>
                   <Row>Precious Icon Siam Branch</Row>
                 </Col>
                 <Col span={8}></Col>
               </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Footer />
      </div>
    )
  }
}
