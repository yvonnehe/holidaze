import MyLayout from "../components/layout/MyLayout";
import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { DatePicker, Space } from "antd";
import { Input, InputNumber } from "antd";

const Shotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { RangePicker } = DatePicker;

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

  function onChange(value) {
    console.log("changed", value);
  }

  return (
    <>
      <MyLayout>
        <Heading heading={hotel.name} />
        <img src={hotel.img} alt={hotel.name} />
        <p>{hotel.shortdescription}</p>
        <p>{hotel.description}</p>
        <br></br>

        <p>{hotel.price} NOK per night</p>
        <div className="site-input-group-wrapper" style={{ width: "30%" }}>
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
          <Input.Group compact>
            <Input
              style={{ width: "60%", height: "42px" }}
              defaultValue="Number of guests"
            />
            <InputNumber
              style={{ width: "24%" }}
              min={1}
              max={99}
              defaultValue={2}
              onChange={onChange}
            />
          </Input.Group>
          <button>Book now</button>
        </div>
      </MyLayout>
    </>
  );
};

export default Shotel;
