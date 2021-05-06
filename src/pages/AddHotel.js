import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AddHotel = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }

  return (
    <>
      <MyLayout>
        <Heading heading="Add new hotels" />
      </MyLayout>
    </>
  );
};

export default AddHotel;
