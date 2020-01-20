import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import ModalSearch from '../../components/ModalSearch/ModalSearch';
import { ButtonFilter } from "../../shared/Button";
import { Row, Col } from "antd";
import { FaSlidersH } from "react-icons/fa";

export class SearchPage extends Component {

  state = {
    modalVisible: false
  }

  handleModalVisible = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible
    }))
  }

  render() {
    const {modalVisible} = this.state
    return (
      <>
        <Navbar />
        <div className="container">
          <Row type="flex" justify="center" style={{ margin: "15px 0 25px" }}>
            <Col>
              <ButtonFilter className="SearchPage-button" onClick={this.handleModalVisible}>
                <Row gutter={[4, 16]}>
                  <Col span={10}>
                    <FaSlidersH />
                  </Col>
                  <Col span={14}>
                    <p>Filter</p>
                  </Col>
                </Row>
              </ButtonFilter>
            </Col>
          </Row>
          <Row type="flex" justify="center" gutter={[16, 16]}>
            <Col xs={12}>
              <MaidCard />
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
            <Col xs={12}>
              <MaidCard />
            </Col>
          </Row>
        </div>
        <ModalSearch onCancel={this.handleModalVisible} visible={modalVisible}/>
      </>
    );
  }
}

export default SearchPage;
