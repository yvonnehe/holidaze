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
      <Row gutter={[32, 32]}>
        {hotels.map((hotel) => {
          if (hotel.favorite) {
            return (
              <Col key={hotel.id} xs={24} sm={12} lg={6}>
                <Link to={`/places-to-stay/${hotel.id}`} className="hotelinfo">
                  <div
                    className="favoritesimg"
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      backgroundImage: `url('${hotel.img}')`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </Link>
                <Link to={`/places-to-stay/${hotel.id}`} className="hotelinfo">
                  <h3
                    className="name h3link"
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    {hotel.name}
                  </h3>
                </Link>
              </Col>
            );
          } else return "";
        })}
      </Row>
    </>
  );
};

export default Favorites;
