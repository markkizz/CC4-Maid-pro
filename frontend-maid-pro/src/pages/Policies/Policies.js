import React, { Component } from 'react'
import './Policies.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Row, Col } from 'antd'

export default class Policies extends Component {
  render() {
    return (
      <div>
        <Navbar />
          <Row type="flex" justify="center" className="Policies-Content">
            <Col lg={18}>
              <Row className="textAlign">
                <h1>Maid Pro Service rules and policies</h1>
              </Row>
              <Row>
                We're committed to providing a secure and fair services for our users and maids. To support this commitment, we've put in place rules and policies that govern our expectations of users and maids, the actions we'll take to keep you safe, and how we'll protect you if something goes wrong.
              </Row>
              <Row type="flex" justify="center" className="Policies-Details">
                <Col lg={20}>
                  Hello
                </Col>
              </Row>
            </Col>
          </Row>
        <Footer />
      </div>
    )
  }
}
