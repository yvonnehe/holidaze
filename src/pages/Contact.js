import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../components/Heading";
import MyLayout from "../components/layout/MyLayout";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Your name please"),
  email: yup
    .string()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    ),
  subject: yup
    .string()
    .required()
    .oneOf(["cats", "dogs", "hello", "other"], "Please choose an option"),
  message: yup.string().required().min(10, "Write a full message please"),
});

const Contact = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  console.log(errors);

  return (
    <>
      <MyLayout>
        <div className="formdiv">
          <Heading heading="Contact us" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "inline-block",
                width: "50%",
                paddingRight: "2.5%",
                marginBottom: "-20px",
              }}
            >
              <label>
                Name
                <br></br>
                <input name="name" ref={register} />
              </label>
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div
              style={{
                display: "inline-block",
                width: "50%",
                paddingLeft: "2.5%",
                marginBottom: "-20px",
              }}
            >
              <label>
                E-mail
                <br></br>
                <input name="email" ref={register} />
              </label>
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <br></br>
            <br></br>
            <label>
              What is this regarding?
              <br></br>
              <select name="subject" ref={register}>
                <option value="cats">Booking</option>
                <option value="dogs">Cancellation</option>
                <option value="hello">Activities</option>
                <option value="other">Other</option>
              </select>
            </label>
            <br></br>
            {errors.subject && <span>{errors.subject.message}</span>}

            <label>
              Your message
              <br></br>
              <textarea name="message" ref={register} />
            </label>
            <br></br>
            {errors.message && <span>{errors.message.message}</span>}

            <button className="formbutton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </MyLayout>
    </>
  );
};

export default Contact;
