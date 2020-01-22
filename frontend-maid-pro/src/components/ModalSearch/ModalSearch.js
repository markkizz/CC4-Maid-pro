import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { filterSearch } from "../../redux/actions/actions";
import {
  Row,
  Col,
  Modal,
  Input,
  Select,
  DatePicker,
  Rate,
  Slider,
  Button
} from "antd";

const { Option } = Select;

class ModalSearch extends Component {
  state = {
    maidName: "",
    typeId: 1,
    workDate: "",
    rating: 4,
    priceRange: ["250", "100"],
    services: {
      "คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)": 1,
      "คอนโด 1 ห้องนอน (ไม่เกิน 50 ตร.ม.)": 2,
      "คอนโด 2 ห้องนอน (ไม่เกิน 80 ตร.ม.)": 3,
      "คอนโด 3 ห้องนอน (ไม่เกิน 100 ตร.ม.)": 4,
      "บ้าน 1 ชั้น (ไม่เกิน 100 ตร.ม.)": 5,
      "บ้าน 2-3 ชั้น (ไม่เกิน 100-200 ตร.ม.)": 6,
      "บ้าน มากกว่า 200 ตร.ม.": 7
    },
    marks: {
      0: "250",
      33: "500",
      66: "750",
      100: "1000"
    }
  };

  handleChangeMaidName = e => {
    const { value } = e.target;
    this.setState(() => ({
      maidName: value
    }));
  };

  handleMultiChange = label => value => {
    const { services } = this.state;
    const typeId = services[value];
    this.setState(() => ({
      [label]: label === "typeId" ? typeId : value
    }));
  };

  handleWorkDate = (moment, dateStr) => {
    const parseDateToNumDay = date => new Date(date).getDay();
    const arrWeekdays = moment._locale._weekdays;
    const numOfDay = parseDateToNumDay(moment._d);
    const dayName = arrWeekdays[numOfDay];
    this.setState(() => ({
      workDate: dayName
    }));
  };

  handlePriceOfRange = value => {
    const { marks } = this.state;
    const priceRange = value.map(numOfPrice => marks[numOfPrice]);
    this.setState(() => ({
      priceRange
    }));
  };

  handleApply = () => {
    const { services, marks, ...filterState } = this.state;
    this.props.sendFilterData({ ...filterState });
    this.props.history.push("/search/filter");
    this.props.onCancel()
    window.location.reload(true);
  };

  render() {
    const { services, marks } = this.state;
    const { onCancel, visible } = this.props;
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        closable
        width={340}
        bodyStyle={{ padding: "45px 16px 16px" }}
      >
        <Row gutter={[14, 16]}>
          <Col span={24}>
            <Row>
              <Col style={{ marginBottom: 5 }}>
                <label>maid name :</label>
              </Col>
              <Col>
                <Input onChange={this.handleChangeMaidName} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col style={{ marginBottom: 5 }}>
                <label>type of place :</label>
              </Col>
              <Col>
                {
                  <Select
                    defaultValue={Object.keys(services)[0]}
                    style={{ width: "100%" }}
                    onChange={this.handleMultiChange("typeId")}
                  >
                    {Object.keys(services).map((service, i) => (
                      <Option key={i + service} value={service}>
                        {service}
                      </Option>
                    ))}
                  </Select>
                }
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row type="flex" align="middle">
              <Col span={4}>
                <label>date :</label>
              </Col>
              <Col span={18}>
                <DatePicker onChange={this.handleWorkDate} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col>
                <Rate
                  defaultValue={4}
                  style={{ fontSize: 32 }}
                  onChange={this.handleMultiChange("rating")}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col>
                <h3>Price / Hour</h3>
              </Col>
              <Col span={24}>
                <Slider
                  range
                  marks={marks}
                  step={null}
                  defaultValue={[0, 100]}
                  tipFormatter={null}
                  onChange={this.handlePriceOfRange}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              block
              size="large"
              onClick={this.handleApply}
            >
              Apply
            </Button>
          </Col>
          <Col span={24} onClick={onCancel}>
            <Button block size="large" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendFilterData: data => dispatch(filterSearch(data))
});

export default withRouter(connect(null, mapDispatchToProps)(ModalSearch));
