import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../utils/constants";
import Item from "../components/Item";
import axios from "axios";

// Form to edit hotel imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//schema definition
const hotelSchema = yup.object().shape({
  name: yup.string().required("Please provide a hotel name"),
  price: yup.number().required("Please provide a price"),
  shortdescription: yup.string().required("Please provide a short description"),
  description: yup.string().required("Please provide a description"),
  extras: yup.string().required("Please provide extras"),
  img: yup.string().required("Please provide an image url"),
});

const AddHotel = () => {
  // authorization
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  // constants for adding hotel
  const [hotel, setHotel] = useState(null);

  // form constants
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(hotelSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);

  // for hotel template
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/1`);
        console.log(response);
        setHotel(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, []);

  // handles submit from form
  const onSubmit = async (data) => {
    setSubmitting(true);
    setPostError(null);

    console.log(data);

    try {
      await axios.post(`${BASE_URL}`, data).then((response) => {
        console.log(response);
        setHotel(response);
        setSuccess(true);
      });
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  if (!auth) {
    history.push("/login");
  } else
    return (
      <>
        <MyLayout>
          <Heading heading="Add new hotels" />
          <p style={{ fontWeight: "700", fontSize: "16px" }}>Template</p>
          <Item {...hotel} />
          <div className="formdiv">
            <form onSubmit={handleSubmit(onSubmit)}>
              {postError && <p>{postError}</p>}
              <fieldset disabled={submitting}>
                <div>
                  <label>
                    Hotel name
                    <br></br>
                    <input name="name" ref={register} />
                  </label>
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                  <label>
                    Price
                    <br></br>
                    <input name="price" ref={register} type="number" />
                  </label>
                  {errors.price && <p>{errors.price.message}</p>}
                </div>
                <div>
                  <label>
                    Short description
                    <br></br>
                    <input name="shortdescription" ref={register} />
                  </label>
                  {errors.shortdescription && (
                    <p>{errors.shortdescription.message}</p>
                  )}
                </div>
                <div>
                  <label>
                    Description
                    <br></br>
                    <textarea name="description" ref={register} type="text" />
                  </label>
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div>
                  <label>
                    Extras (use a dash - between the extras)
                    <br></br>
                    <input name="extras" ref={register} />
                  </label>
                  {errors.extras && <p>{errors.extras.message}</p>}
                </div>
                <div>
                  <label>
                    Image URL
                    <input name="img" ref={register} />
                  </label>
                  {errors.img && <p>{errors.img.message}</p>}
                </div>
                <button className="formbutton" type="submit">
                  {submitting ? "Adding ..." : "Add"}
                </button>
              </fieldset>
            </form>
            {success ? <p>New hotel {hotel.name} was added</p> : null}
          </div>
        </MyLayout>
      </>
    );
};

export default AddHotel;
