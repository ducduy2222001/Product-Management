import { Button, Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode, useEffect, useRef, useState } from "react";
import "../layout/style.css";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
const { Search } = Input;
interface Props {
  children: ReactNode;
  onSearch: (e: any) => void;
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
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Navigation({ children, onSearch }: Props) {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleFilterSearch = (e: any) => {
    if (!onSearch) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearch(e);
    }, 300);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <Row style={styleRowCol}>
          <Col span={24} style={styleRowCol}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onChange={handleFilterSearch}
              className="search"
            />
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
