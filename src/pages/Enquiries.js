import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { CONTACT_URL } from "../utils/constants";

const Enquiries = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${CONTACT_URL}`);
        console.log(response);
        setContact(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  });

  if (loading) {
    return (
      <MyLayout>
        <div>
          <p>The content is loading... Please hold on.</p>
        </div>
      </MyLayout>
    );
  }

  if (error) {
    return (
      <MyLayout>
        <div>
          <p>There has been an error. We apologize for the inconvenience.</p>
        </div>
      </MyLayout>
    );
  }

  return (
    <>
      <MyLayout>
        <Heading heading="Bookings" />
        <Heading heading="Enquries" />
        {contact.map((contact) => {
          return (
            <div key={contact.id} className="contactcon">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
          );
        })}
      </MyLayout>
    </>
  );
};

export default Enquiries;
