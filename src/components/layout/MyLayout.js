import { Layout } from "antd";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/Holidaze-white-logo.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const { Header, Footer, Content } = Layout;

const MyLayout = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

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
            <img src={logo} alt="Holidaze logo" width={140} />
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
        {auth ? (
          <>
            <Link
              className="link"
              style={{ color: "#ffffff", padding: "0px 25px" }}
              to="/enquiries"
            >
              Enquiries
            </Link>
            <Link
              className="link"
              style={{ color: "#ffffff", padding: "0px 25px" }}
              to="/addhotel"
            >
              Add new hotels
            </Link>
            <button className="logbutton" onClick={logout} type="button">
              Log out
            </button>
          </>
        ) : (
          <button className="logbutton" type="button">
            <Link className="loglink" to="/login">
              Log in
            </Link>
          </button>
        )}
      </Header>
      <Content style={{ padding: "40px 50px", backgroundColor: "#ffffff" }}>
        <div className="site-layout-content"> {children}</div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "#E7EEF5" }}>
        © Yvonne Helland 2021
      </Footer>
    </Layout>
  );
};

export default MyLayout;
