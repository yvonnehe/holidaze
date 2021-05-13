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
          <div className="titlesearch">
            <Heading heading="Places to stay" />
            <div className="filterdiv">
              <input
                className="filter"
                type="text"
                name="query"
                onChange={handleFiltering}
                placeholder="Search..."
              />
            </div>
          </div>
          {filteredHotels.map((hotel) => {
            return (
              <div key={hotel.id} className="hoteldiv">
                <Row gutter={[16, 16]}>
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
                      <p className="text">{hotel.shortdescription}</p>
                      <h3 className="biggertext">{hotel.name}</h3>
                      <hr className="line"></hr>
                      <br></br>
                      <p className="extras text">{hotel.extras}</p>
                      <p className="text">
                        {hotel.distance}km from Bergen city centre
                      </p>
                    </Link>
                  </Col>
                  <Col sm={24} lg={4}>
                    <Link
                      to={`/places-to-stay/${hotel.id}`}
                      className="hotelinfo"
                    >
                      <p className="price biggertext">{hotel.price} NOK</p>
                      <p className="taxes text">Per night including taxes</p>
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
  } else
    return (
      <>
        <MyLayout>
          <div className="titlesearch">
            <Heading heading="Places to stay" />
            <div className="filterdiv">
              <input
                className="filter"
                type="text"
                name="query"
                onChange={handleFiltering}
                placeholder="Search..."
              />
            </div>
          </div>
          {hotels.map((hotel) => {
            return (
              <div key={hotel.id} className="hoteldiv">
                <Link to={`/places-to-stay/${hotel.id}`} className="hotelinfo">
                  <Row gutter={[16, 16]}>
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
                      <p className="text">{hotel.shortdescription}</p>
                      <h3 className="biggertext">{hotel.name}</h3>
                      <hr className="line"></hr>
                      <br></br>
                      <p className="extras text">{hotel.extras}</p>
                      <p className="text">
                        {hotel.distance}km from Bergen city centre
                      </p>
                    </Col>
                    <Col sm={24} lg={4}>
                      <p className="price biggertext">{hotel.price} NOK</p>
                      <p className="taxes text">Per night including taxes</p>
                    </Col>
                  </Row>
                </Link>
              </div>
            );
          })}
        </MyLayout>
      </>
    );
};

export default Places;
