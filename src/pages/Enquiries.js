import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Enquiries = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }

  return (
    <>
      <MyLayout>
        <Heading heading="Bookings" />
        <Heading heading="Enquries" />
      </MyLayout>
    </>
  );
};

export default Enquiries;
