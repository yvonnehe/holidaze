import { Layout, Menu } from "antd";
import Link from "react-router-dom";
import logo from "../../images/Holidaze-white-logo.svg";
const { Header, Footer, Content } = Layout;

const MyLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#2A384C" }}>
        <div className="logo">
          <img src={logo} alt="Holidaze logo" width={150} />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Contact</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", backgroundColor: "#ffffff" }}>
        <div className="site-layout-content"> {children}</div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "#E7EEF5" }}>
        © Yvonne Helland 2021
      </Footer>
    </Layout>
  );
};

export default MyLayout;
