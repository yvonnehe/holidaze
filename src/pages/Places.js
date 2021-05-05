import MyLayout from "../components/layout/MyLayout";
import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Row, Col } from "antd";

const Places = () => {
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

  //filtering
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const handleFiltering = (e) => {
    let filterHotels = hotels.filter((hotel) => {
      return hotel.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredHotels(filterHotels);
    setFiltered(true);
  };
  const filterinput = document.querySelector(".filter");
  if (filterinput === "") {
    setFiltered(false);
  }

  if (filtered === true) {
    return (
      <>
        <MyLayout>
          <Heading heading="Places to stay" />
          <input
            className="filter"
            type="text"
            name="query"
            onChange={handleFiltering}
          />
          {filteredHotels.map((hotel) => {
            return (
              <div key={hotel.id} className="hoteldiv">
                <Row>
                  <Col sm={24} lg={9}>
                    <div>
                      <img
                        src={hotel.img}
                        alt={hotel.name}
                        style={{ width: "100%" }}
                        className="hotelimg"
                      />
                    </div>
                  </Col>
                  <Col sm={24} lg={11}>
                    <Link
                      to={`/places-to-stay/${hotel.id}`}
                      className="hotelinfo"
                    >
                      <p>{hotel.shortdescription}</p>
                      <h3>{hotel.name}</h3>
                      <hr></hr>
                      <p>{hotel.extras}</p>
                      <p>{hotel.distance}km from Bergen city centre</p>
                    </Link>
                  </Col>
                  <Col sm={24} lg={4}>
                    <Link
                      to={`/places-to-stay/${hotel.id}`}
                      className="hotelinfo"
                    >
                      <p>{hotel.price} NOK</p>
                      <p>Per night including taxes</p>
                    </Link>
                  </Col>
                </Row>
              </div>
            );
          })}
        </MyLayout>
      </>
    );
  }

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
      <MyLayout>
        <Heading heading="Places to stay" />
        <input
          className="filter"
          type="text"
          name="query"
          onChange={handleFiltering}
        />
        {hotels.map((hotel) => {
          return (
            <div key={hotel.id} className="hoteldiv">
              <Row>
                <Col sm={24} lg={9}>
                  <div>
                    <img
                      src={hotel.img}
                      alt={hotel.name}
                      style={{ width: "100%" }}
                      className="hotelimg"
                    />
                  </div>
                </Col>
                <Col sm={24} lg={11}>
                  <Link
                    to={`/places-to-stay/${hotel.id}`}
                    className="hotelinfo"
                  >
                    <p>{hotel.shortdescription}</p>
                    <h3>{hotel.name}</h3>
                    <hr></hr>
                    <p>{hotel.extras}</p>
                    <p>{hotel.distance}km from Bergen city centre</p>
                  </Link>
                </Col>
                <Col sm={24} lg={4}>
                  <Link
                    to={`/places-to-stay/${hotel.id}`}
                    className="hotelinfo"
                  >
                    <p>{hotel.price} NOK</p>
                    <p>Per night including taxes</p>
                  </Link>
                </Col>
              </Row>
            </div>
          );
        })}
      </MyLayout>
    </>
  );
};

export default Places;
