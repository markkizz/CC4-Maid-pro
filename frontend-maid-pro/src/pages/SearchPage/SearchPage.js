import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import ModalSearch from "../../components/ModalSearch/ModalSearch";
import { ButtonFilter } from "../../shared/Button";
import { Row, Col, notification } from "antd";
import { FaSlidersH } from "react-icons/fa";
import axios from "../../config/api.service";
import { dispatch } from "rxjs/internal/observable/pairs";
import { selectedMaid } from "../../redux/actions/actions";
import { connect } from "react-redux";

export class SearchPage extends Component {
  state = {
    modalVisible: false,
    searchMaidData: []
  };

  handleModalVisible = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible
    }));
  };

  componentDidMount = async () => {
    const { option } = this.props.match.params;
    const { serviceType, filterSearch } = this.props;
    if (option === "filter") {
      try {
        const {maidName, typeId, workDate, rating} = filterSearch;
        console.log(typeId, typeId, typeId)
        const price_hour = filterSearch.priceRange.join(",");
        const result = await axios.get(`/users/filter?name=${maidName}&type_id=${typeId}&work_date=${workDate}&price_hour=${price_hour}&rating=${rating}`);
        if(!result.data && result.data.length === 0) {
          this.openNotificationWithIcon()
          const {data} = await axios.get("/users/maids?limit=10");
          this.setState({
            searchMaidData: data
          })
        } else {
          this.setState({
            searchMaidData: result.data
          })
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (option === "quicksearch") {
      try {
        const { data } = await axios.get(
          `/users/maids/quick-search?buildingType=${serviceType}`
        );
        this.setState({
          searchMaidData: data
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  handleClickMaid = maidId => {
    dispatch(selectedMaid(maidId));
    this.history.push(`/maid/${maidId}`);
  };

  openNotificationWithIcon = () => {
    notification['warning']({
      message: 'Maid Not Found',
      description:
        'Your search option not match maid services',
    });
  };

  render() {
    const { modalVisible, searchMaidData } = this.state;
    return (
      <>
        <Navbar />
        <div className="container">
          <Row
            type="flex"
            justify="center"
            style={{
              margin: "15px 0 25px"
            }}
          >
            <Col>
              <ButtonFilter
                className="SearchPage-button"
                onClick={this.handleModalVisible}
              >
                <Row gutter={[4, 16]}>
                  <Col span={10}>
                    <FaSlidersH />
                  </Col>
                  <Col span={14}>
                    <p> Filter </p>
                  </Col>
                </Row>
              </ButtonFilter>
            </Col>
          </Row>
          <Row type="flex" justify="center" gutter={[16, 16]}>
            {searchMaidData.map(maid => (
              <Col
                key={maid.id}
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <MaidCard maid={maid} />
              </Col>
            ))}
          </Row>
        </div>
        <ModalSearch
          onCancel={this.handleModalVisible}
          visible={modalVisible}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    serviceType: state.search.quickSearchType,
    filterSearch: state.search.filterSearch
  };
};

export default connect(mapStateToProps, null)(SearchPage);
