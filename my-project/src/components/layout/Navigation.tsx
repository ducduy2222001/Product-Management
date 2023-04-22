import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import "../layout/style.css";
interface Props {
  children: ReactNode;
}

function Navigation({ children }: Props) {
  return (
    <Layout className="layout">
      <Header className="header">CHỨC NĂNG</Header>
      <Layout>
        <Content> {children}</Content>
      </Layout>
    </Layout>
  );
}
export default Navigation;
