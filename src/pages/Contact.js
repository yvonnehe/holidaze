import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../components/Heading";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(3, "Your full first name please"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(4, "Your full last name please"),
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
      <Heading heading="Contact" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First name
          <br></br>
          <input name="firstName" ref={register} />
        </label>
        <br></br>
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>
          Last name
          <br></br>
          <input name="lastName" ref={register} />
        </label>
        <br></br>
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label>
          E-mail
          <br></br>
          <input name="email" ref={register} />
        </label>
        <br></br>
        {errors.email && <span>{errors.email.message}</span>}

        <label>
          Subject
          <br></br>
          <select name="subject" ref={register}>
            <option value="cats">Sending cat pics</option>
            <option value="dogs">Sending dog pics</option>
            <option value="hello">Just want to say hi</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br></br>
        {errors.subject && <span>{errors.subject.message}</span>}

        <label>
          Your message
          <br></br>
          <input name="message" ref={register} />
        </label>
        <br></br>
        {errors.message && <span>{errors.message.message}</span>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Contact;
