import MyLayout from "../components/layout/MyLayout";
import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

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
        {hotels.map((hotel) => {
          return (
            <div key={hotel.id} className="hoteldiv">
              <p>{hotel.shortdescription}</p>
              <p>{hotel.name}</p>
              <Link to={`/places-to-stay/${hotel.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          );
        })}
      </MyLayout>
    </>
  );
};

export default Places;
