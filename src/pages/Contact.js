import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";
import { useState } from "react";
import { CONTACT_URL } from "../utils/constants";
import axios from "axios";

// form imports
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// schema definition
const schema = yup.object().shape({
  Name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Your name please"),
  Email: yup
    .string()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    ),
  Subject: yup.string().required(),
  Message: yup.string().required().min(3, "Write a full message please"),
});

const Contact = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);

  // constants for adding contact
  const [, setContact] = useState(null);

  // handles submit from form
  const onSubmit = async (data) => {
    setSubmitting(true);
    setPostError(null);

    console.log(data);

    try {
      await axios.post(`${CONTACT_URL}`, data).then((response) => {
        console.log(response);
        setContact(response);
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

  // returns
  return (
    <>
      <MyLayout>
        <div className="formdiv">
          <Heading heading="Contact us" />
          <form onSubmit={handleSubmit(onSubmit)}>
            {postError && <p>{postError}</p>}
            <fieldset disabled={submitting}>
              <div
                style={{
                  display: "inline-block",
                  width: "50%",
                  paddingRight: "2.5%",
                }}
              >
                <label>Name</label>
                <input name="Name" ref={register} />
                {errors.Name && <span>{errors.Name.message}</span>}
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "50%",
                  paddingLeft: "2.5%",
                }}
              >
                <label>E-mail</label>
                <input name="Email" ref={register} />
                {errors.Email && <span>{errors.Email.message}</span>}
              </div>
              <label>What is this regarding?</label>
              <select
                name="Subject"
                ref={register}
                defaultChecked="booking"
                defaultValue="booking"
              >
                <option value="booking">Booking</option>
                <option value="cancellation">Cancellation</option>
                <option value="activities">Activities</option>
                <option value="other">Other</option>
              </select>
              {errors.Subject && <span>{errors.Subject.message}</span>}

              <label>Your message</label>
              <textarea name="Message" ref={register} />
              {errors.Message && <span>{errors.Message.message}</span>}

              <button className="formbutton" type="submit">
                Submit
              </button>
            </fieldset>
          </form>
          {success ? (
            <p>Message was sent! We will get back to you shortly.</p>
          ) : null}
        </div>
      </MyLayout>
    </>
  );
};

export default Contact;
