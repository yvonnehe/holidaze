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
  const [showSearchOptions, setShowSearchOptions] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`);
        console.log(response.data);
        setHotels(response.data);
        setFilteredHotels(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  //filtering
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [filtered, setFiltered] = useState(false);

  const handleFiltering = (e) => {
    let filterHotels = hotels.filter((hotel) => {
      return hotel.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setShowSearchOptions(e.target.value ? true : false);
    setFilteredHotels(filterHotels);
    setFiltered(true);
  };
  const filterinput = document.querySelector(".filter");
  if (filterinput === "") {
    setFiltered(false);
  }

  if (filteredHotels) {
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
              {showSearchOptions &&
                filteredHotels.map((hotel) => {
                  return (
                    <div key={hotel.id} className="searchdiv">
                      <Link
                        to={`/places-to-stay/${hotel.id}`}
                        className="hotelinfo"
                      >
                        {hotel.name}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
          {filteredHotels.map((hotel) => {
            return (
              <div key={hotel.id} className="hoteldiv">
                <Row gutter={[16, 16]}>
                  <Col sm={(24, { justify: "center" })} lg={9}>
                    <div>
                      <img
                        src={hotel.img}
                        alt={hotel.name}
                        style={{ width: "100%" }}
                        className="hotelimg"
                      />
                    </div>
                  </Col>
                  <Col sm={(24, { justify: "center" })} lg={11}>
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
                  <Col sm={(24, { justify: "center" })} lg={4}>
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
  } else if (loading) {
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
    return <MyLayout></MyLayout>;
  }
};

export default Places;
