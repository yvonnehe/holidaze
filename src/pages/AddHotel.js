import useAxios from "../utils/useAxios";
import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../utils/constants";
import Item from "../components/Item";

// Form to edit hotel imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//schema definition
const hotelSchema = yup.object().shape({
  name: yup.string().required("Please provide a hotel name"),
  price: yup.number().required("Please provide a price"),
  description: yup.string().required("Please provide a description"),
  image_url: yup.string().required("Please provide an image url"),
});

const AddHotel = () => {
  // authorization
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  // constants for adding hotel
  const [hotel, setHotel] = useState(null);
  const http = useAxios();

  // form constants
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(hotelSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);

  // handles submit from form
  const onSubmit = async (data) => {
    setSubmitting(true);
    setPostError(null);

    console.log(data);

    try {
      const response = await http.post(`${BASE_URL}`, data);
      console.log("response", response.data);
      setHotel(response.data);
      setSuccess(true);
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  if (!auth) {
    history.push("/login");
  }

  return (
    <>
      <MyLayout>
        <Heading heading="Add new hotels" />
        <p>Template</p>
        <Item {...hotel} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {postError && <p>{postError}</p>}
          <fieldset disabled={submitting}>
            <div>
              <input name="name" placeholder="Hotel name" ref={register} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <input
                name="price"
                placeholder="Price"
                ref={register}
                type="number"
              />
              {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div>
              <input
                name="shortdescription"
                placeholder="Short description"
                ref={register}
                type="text"
              />
              {errors.shortdescription && (
                <p>{errors.shortdescription.message}</p>
              )}
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Description"
                ref={register}
                type="text"
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div>
              <input
                name="extras"
                placeholder="Extras (use a dash - between the extras)"
                ref={register}
                type="extras"
              />
              {errors.extras && <p>{errors.extras.message}</p>}
            </div>
            <div>
              <input
                name="img"
                placeholder="Image URL"
                ref={register}
                type="text"
              />
              {errors.img && <p>{errors.img.message}</p>}
            </div>
            <button className="button__add" type="submit">
              {submitting ? "Adding ..." : "Add"}
            </button>
          </fieldset>
        </form>
        {success ? <p>New hotel {hotel.name} was added</p> : null}
      </MyLayout>
    </>
  );
};

export default AddHotel;
