import MyLayout from "../components/layout/MyLayout";
import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { DatePicker, Space } from "antd";
import { Input, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  guests: yup.number().required(),
  date: yup
    .array()
    .of(
      yup.object().shape({
        _d: yup.date("this is not a valid date"),
      })
    )
    .required(),
});

const Shotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { RangePicker } = DatePicker;

  //form
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }
  console.log(errors);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="site-input-group-wrapper" style={{ width: "30%" }}>
            <Space direction="vertical" size={12}>
              <Controller
                as={RangePicker}
                options={{ name: "data" }}
                control={control}
                name="date"
                onChange={([selected]) => {
                  return { value: selected };
                }}
                defaultValue={{}}
              />
            </Space>
            {errors.date && <span>{errors.date.message}</span>}
            <Input.Group compact>
              <Input
                style={{ width: "60%", height: "42px" }}
                defaultValue="Number of guests"
              />
              <InputNumber
                style={{ width: "24%" }}
                min={1}
                max={999}
                defaultValue={2}
                onChange={onChange}
                name="guests"
                ref={register}
              />
            </Input.Group>
            {errors.guests && <span>{errors.guests.message}</span>}
            <button
              className="formbutton"
              type="Submit"
              style={{ width: "84%" }}
            >
              Book now
            </button>
          </div>
        </form>
      </MyLayout>
    </>
  );
};

export default Shotel;
