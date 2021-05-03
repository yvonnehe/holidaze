import MyLayout from "../components/layout/MyLayout";
import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Shotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log(response);
        setHotel(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

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
        <Heading heading="Specific hotel" />
        <p>{hotel.name}</p>
        <p>{hotel.shortdescription}</p>
        <p>{hotel.description}</p>
        <p>Current price: {hotel.price} NOK</p>
        <img src={hotel.img} alt="hotel" />
      </MyLayout>
    </>
  );
};

export default Shotel;
