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

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${CONTACT_URL}`);
        console.log(response);
        setContacts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <MyLayout>
        <div>
          <p>The content is loading... Please hold on.</p>
        </div>
      </MyLayout>
    );
  } else if (error) {
    return (
      <MyLayout>
        <div>
          <p>There has been an error. We apologize for the inconvenience.</p>
        </div>
      </MyLayout>
    );
  } else {
    return (
      <>
        <MyLayout>
          <Heading heading="Bookings" />
          <Heading heading="Enquries" />
          {contacts.map((contact) => {
            console.log(contact);

            return (
              <div key={contact.id} className="contactcon">
                <p>{contact.Name}</p>
                <p>{contact.Email}</p>
                <p>{contact.Subject}</p>
                <p>{contact.Message}</p>
                <hr className="line"></hr>
                <br></br>
              </div>
            );
          })}
        </MyLayout>
      </>
    );
  }
};

export default Enquiries;
