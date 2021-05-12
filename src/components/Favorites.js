import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Row, Col } from "antd";

const Favorites = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`);
        console.log(response.data);
        setHotels(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div>
        <p>The content is loading... Please hold on.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>There has been an error. We apologize for the inconvenience.</p>
      </div>
    );
  }

  return (
    <>
      <h3 style={{ textAlign: "center" }}>CUSTOMER FAVORITES</h3>
      <Row gutter={[16, 16]}>
        {hotels.map((hotel) => {
          if (hotel.favorite) {
            return (
              <div key={hotel.id} className="favoritesdiv">
                <Col sm={12} lg={6}>
                  <div>
                    <img
                      src={hotel.img}
                      alt={hotel.name}
                      style={{ width: "100%" }}
                      className="favoritesimg"
                    />
                  </div>
                  <Link
                    to={`/places-to-stay/${hotel.id}`}
                    className="hotelinfo"
                  >
                    <h3 className="name biggertext">{hotel.name}</h3>
                  </Link>
                </Col>
              </div>
            );
          } else return "";
        })}
      </Row>
    </>
  );
};

export default Favorites;
