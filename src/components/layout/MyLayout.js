import { Layout } from "antd";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/Holidaze-white-logo.svg";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Burger from "../../images/Holidaze-blue-burger.svg";
const { Header, Footer, Content } = Layout;

const MyLayout = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [prevWindowSize, setPrevWindowSize] = useState(window.innerWidth);

  function logout() {
    setAuth(null);
    history.push("/");
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function checkWindowSize(onload) {
    if (
      (window.innerWidth > 875 && prevWindowSize < 875) ||
      (onload && window.innerWidth > 875)
    ) {
      setShowMenu(true);
    }
    setPrevWindowSize(window.innerWidth);
  }

  window.addEventListener("load", () => checkWindowSize(true));

  window.addEventListener("resize", () => checkWindowSize());

  return (
    <Layout className="layout">
      <Header
        className={showMenu ? "header-menu" : "header"}
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
        <div className={showMenu ? "links-menu" : "links"}>
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
          {auth && (
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
            </>
          )}
        </div>
        {showMenu && (
          <button className="logbutton" onClick={logout} type="button">
            <Link className="loglink" to="/login" onClick={auth && logout}>
              {auth ? "Log out" : "Log in"}
            </Link>
          </button>
        )}
        <img
          className="navToggle"
          src={Burger}
          alt="hamburger menu"
          id="burger"
          onClick={toggleMenu}
        />
      </Header>
      <Content
        style={{
          padding: "40px 50px",
          backgroundColor: "#ffffff",
          minHeight: "90vh",
        }}
      >
        <div className="site-layout-content"> {children}</div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#E7EEF5",
          position: "relative",
          bottom: "0px",
          width: "100%",
        }}
      >
        © Yvonne Helland 2021
      </Footer>
    </Layout>
  );
};

export default MyLayout;
