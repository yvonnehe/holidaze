import { Layout } from "antd";
import { Link } from "react-router-dom";
import logo2 from "../../images/Holidaze-blue-logo.svg";
import Hero from "../Hero";
const { Header, Footer, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "Space-between",
          zIndex: "10",
        }}
      >
        <Link to="/">
          <div className="logo">
            <img src={logo2} alt="Holidaze logo" width={140} />
          </div>
        </Link>
        <div>
          <Link
            className="link"
            style={{ color: "#2A384C", padding: "0px 25px" }}
            to="/places-to-stay"
          >
            Places to stay
          </Link>
          <Link
            className="link"
            style={{ color: "#2A384C", padding: "0px 25px" }}
            to="/contact"
          >
            Contact us
          </Link>
        </div>
        <button className="logbutton logbutton--blue">
          <Link className="loglink--light" to="/login">
            Log in
          </Link>
        </button>
      </Header>
      <Hero />
      <Content style={{ padding: "0 50px", backgroundColor: "#ffffff" }}>
        <div className="site-layout-content"> {children}</div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "#E7EEF5" }}>
        © Yvonne Helland 2021
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
