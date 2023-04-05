import React from "react";

import { Row, Col } from "antd";
import FormAdd from "../components/FormAdd";

const styleRowCol = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function AddProduct() {
  return (
    <Row style={styleRowCol}>
      <Col span={12}>
        <FormAdd />
      </Col>
    </Row>
  );
}

export default AddProduct;
