import React, { Component } from 'react'
import {Row, Col} from 'antd'
import './Footer.css'
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Row className="Footer-Body" type="flex" justify="center">
          <Col className="Footer-Text">
            <span className="Footer-IconCenter">
              <IoIosCall />&nbsp;+66 (81) 999 9999
            </span>
          </Col>
          <Col className="Footer-Text">
            <span className="Footer-IconCenter">
              <MdEmail />&nbsp;info@maidproservice.com
            </span>
          </Col>
          <Col className="Footer-Text">
            <span className="Footer-IconCenter">
              <AiFillHome />&nbsp;4th floor Pantip Plaza, Bangkok 10400
            </span>
          </Col>
          <Col className="Footer-Text">
            <span>
              Maid Pro Service © 2019
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
