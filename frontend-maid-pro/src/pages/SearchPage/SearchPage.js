import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MaidCard from "../../components/MaidCard/MaidCard";
import ModalSearch from "../../components/ModalSearch/ModalSearch";
import { ButtonFilter } from "../../shared/Button";
import { Row, Col } from "antd";
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
    const { quickSearchType, filterSearch } = this.props;
    if (option === "filter") {
      console.log(filterSearch);
      // axios
      //   .get(`/users/search`, )
      //   .then(result => {
      //     this.setState({
      //       searchMaidData: result.data
      //     });
      //   });
    }
    if (option === "quicksearch") {
      try {
        const { data } = await axios.get(
          `/users/quicksearch?type=${quickSearchType}`
        );
        this.setState(() => ({
          searchMaidData: data
        }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  handleClickMaid = maidId => {
    dispatch(selectedMaid(maidId));
    this.history.push(`/maid/${maidId}`);
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
    quickSearchType: /*state.search.quickSearchType*/ "condo",
    filterSearch: state.search.filterSearch
  };
};

export default connect(mapStateToProps, null)(SearchPage);
