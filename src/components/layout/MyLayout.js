import { Layout } from "antd";
import { Link } from "react-router-dom";
import logo from "../../images/Holidaze-white-logo.svg";
const { Header, Footer, Content } = Layout;

const MyLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header
        style={{
          backgroundColor: "#2A384C",
          display: "flex",
          justifyContent: "Space-between",
        }}
      >
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Holidaze logo" width={150} />
          </div>
        </Link>
        <div>
          <Link
            className="link"
            style={{ color: "#ffffff", padding: "0px 25px" }}
            to="/places-to-stay"
          >
            Places to stay
          </Link>
          <Link
            className="link"
            style={{ color: "#ffffff", padding: "0px 25px" }}
            to="/contact"
          >
            Contact us
          </Link>
        </div>
        <button className="logbutton">
          <Link to="/login">Log in</Link>
        </button>
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
