import React, { Component } from "react";
import {
  Row,
  Col,
  Modal,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Rate,
  Slider,
  Button
} from "antd";

const { Option } = Select;

class ModalSearch extends Component {
  state = {
    maidName: "",
    services: [
      "คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)",
      "คอนโด 1 ห้องนอน (ไม่เกิน 50 ตร.ม.)",
      "คอนโด 3 ห้องนอน (ไม่เกิน 100 ตร.ม.)",
      "บ้าน 1 ชั้น (ไม่เกิน 100 ตร.ม.)",
      "บ้าน 2-3 ชั้น (ไม่เกิน 100-200 ตร.ม.)",
      "บ้าน มากกว่า 200 ตร.ม."
    ],
    marks: {
      0: "500",
      33: "1000",
      66: "1500",
      100: "2000"
    }
  };

  render() {
    const { services, marks } = this.state;
    return (
      <Modal
        visible
        footer={null}
        closable
        width={340}
        bodyStyle={{ padding: "60px 16px 16px" }}
      >
        <Row gutter={[14, 16]}>
          <Col span={24}>
            <Row>
              <Col style={{ marginBottom: 5 }}>
                <label>maid name :</label>
              </Col>
              <Col>
                <Input />
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
                  <Select style={{ width: "100%" }}>
                    {services.map((service, i) => (
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
                <DatePicker />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row type="flex" align="middle">
              <Col span={4}>
                <label>time :</label>
              </Col>
              <Col span={18}>
                <TimePicker />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col>
                <Rate allowHalf defaultValue={4} style={{ fontSize: 32 }} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <h3>Price / Hour</h3>
              </Col>
              <Col span={24}>
                <Slider
                  range
                  marks={marks}
                  step={null}
                  defaultValue={[0, 100]}
                  tipFormatter={null}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button type="primary" block size="large">
              Apply
            </Button>
          </Col>
          <Col span={24}>
            <Button block size="large">
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ModalSearch;
