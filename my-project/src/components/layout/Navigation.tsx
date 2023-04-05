import { Button, Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode, useEffect, useState } from "react";
import "../layout/style.css";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
const { Search } = Input;
interface Props {
  children: ReactNode;
  onSearch: (value: string) => void;
}
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const styleRowCol = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Navigation({ children, onSearch }: Props) {
  const handleFilterSearch = (value: any) => {
    onSearch(value);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <Row style={styleRowCol}>
          <Col span={6} style={styleRowCol}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onChange={handleFilterSearch}
              className="search"
            />
          </Col>
          <Col span={6} style={styleRowCol}>
            <Link to="/add">
              <Button type="primary">Add</Button>
            </Link>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Content> {children}</Content>
      </Layout>
    </Layout>
  );
}

export default Navigation;
