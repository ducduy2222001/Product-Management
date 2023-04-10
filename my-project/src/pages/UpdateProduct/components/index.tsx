import React from "react";
import FormUpdate from "./FormUpdate";
import { Row, Col } from "antd";

const styleRowCol = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function UpdateProduct() {
  return (
    <Row style={styleRowCol}>
      <Col span={12}>
        <FormUpdate />
      </Col>
    </Row>
  );
}

export default UpdateProduct;

