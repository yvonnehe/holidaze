import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { CONTACT_URL, BOOKING_URL } from "../utils/constants";
import { Row, Col } from "antd";

const Enquiries = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BOOKING_URL}`);
        console.log(response);
        setBookings(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
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
          <Row gutter={[32, 32]}>
            <Col sm={24} lg={12}>
              <Heading heading="Bookings" />
              {bookings.map((booking) => {
                console.log(booking);

                return (
                  <div key={booking.id} className="contactcon">
                    <p className="bold">{booking.name}</p>
                    <p>{booking.guests} guests</p>
                    <p>
                      {
                        new Date(booking.datefrom)
                          .toLocaleString()
                          .split(",")[0]
                      }{" "}
                      -{" "}
                      {new Date(booking.dateto).toLocaleString().split(",")[0]}
                    </p>
                    <p>Total: {booking.price} NOK</p>
                    <hr className="line"></hr>
                    <br></br>
                  </div>
                );
              })}
              <div style={{ marginBottom: "30px" }}></div>
            </Col>
            <Col sm={24} lg={12}>
              <Heading heading="Enquiries" />
              {contacts.map((contact) => {
                console.log(contact);

                return (
                  <div key={contact.id} className="contactcon">
                    <p className="bold">{contact.Name}</p>
                    <p>{contact.Email}</p>
                    <p>{contact.Subject}</p>
                    <p>{contact.Message}</p>
                    <hr className="line"></hr>
                    <br></br>
                  </div>
                );
              })}
            </Col>
          </Row>
        </MyLayout>
      </>
    );
  }
};

export default Enquiries;
