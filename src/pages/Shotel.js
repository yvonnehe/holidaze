import MyLayout from "../components/layout/MyLayout";
import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BOOKING_URL } from "../utils/constants";
import { DatePicker, Space } from "antd";
import { Input, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col } from "antd";

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
  const { register, handleSubmit, errors, control, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);
  const [, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const formValues = watch();
  // constants for adding bookings
  const [, setBookings] = useState(null);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setPostError(null);
    console.log(data);

    data = {
      id: hotel.id,
      guests: data.guests,
      datefrom: data.date[0],
      dateto: data.date[1],
      name: hotel.name,
      price:
        Math.ceil((data.date[1] - data.date[0]) / (1000 * 3600 * 24)) *
        hotel.price,
    };
    console.log(data);

    try {
      await axios.post(`${BOOKING_URL}`, data).then((response) => {
        console.log(response);
        setBookings(response);
        setSuccess(true);
      });
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

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
          <Heading heading={hotel.name} />
          <Row gutter={[32, 32]}>
            <Col sm={24} lg={12}>
              <img
                src={hotel.img}
                alt={hotel.name}
                className="shotelimg"
                style={{ width: "100%" }}
              />
            </Col>
            <Col sm={24} lg={12}>
              <h4>About this space</h4>
              <p>{hotel.shortdescription}</p>
              <p>{hotel.description}</p>
              <h4>Amenities</h4>
              <p>{hotel.extras}</p>
              <h4>Location</h4>
              <p>{hotel.distance}km from Bergen city centre</p>
              <br></br>

              <p>{hotel.price} NOK per night</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bookingdiv">
                  <div
                    className="site-input-group-wrapper"
                    style={{ width: "220px" }}
                  >
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
                        style={{ width: "160.5px", height: "42px" }}
                        defaultValue="Number of guests"
                      />
                      <InputNumber
                        style={{ width: "59px" }}
                        min={1}
                        max={99}
                        defaultValue={2}
                        name="guests"
                        ref={register}
                      />
                    </Input.Group>
                    {errors.guests && <span>{errors.guests.message}</span>}
                    <button
                      className="formbutton"
                      type="submit"
                      style={{ width: "219px" }}
                    >
                      {submitting ? "Booking ..." : "Book now"}
                    </button>
                    <div>
                      Total price{" "}
                      {formValues.date &&
                        Math.ceil(
                          (formValues.date[1] - formValues.date[0]) /
                            (1000 * 3600 * 24)
                        ) * hotel.price}
                    </div>
                  </div>
                </div>
              </form>
              {success ? <p>Booking complete!</p> : null}
            </Col>
          </Row>
        </MyLayout>
      </>
    );
};

export default Shotel;
