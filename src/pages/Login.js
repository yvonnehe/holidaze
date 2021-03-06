import { useState, useContext } from "react";
import { loginSchema } from "../utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL_LOGIN, AUTH_PATH } from "../utils/constants";
import axios from "axios";
import Heading from "../components/Heading";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import MyLayout from "../components/layout/MyLayout";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();

  // submits login form/handles login
  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);
    try {
      await axios
        .post(`${BASE_URL_LOGIN}${AUTH_PATH}`, data)
        .then((response) => {
          console.log("response", response);
          setAuth(response);
        });
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
      history.push("/enquiries");
    }
  };

  // returns
  return (
    <>
      <MyLayout>
        <div className="formdiv">
          <Heading heading="Log in as admin" />
          <form onSubmit={handleSubmit(onSubmit)}>
            {loginError && <p>{loginError}</p>}
            <fieldset disabled={submitting}>
              <div>
                <label>Username</label>
                <input name="identifier" ref={register} />
                <br></br>
                {errors.identifier && <span>{errors.identifier.message}</span>}
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  ref={register}
                  id="passwordinput"
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <button className="formbutton" type="submit">
                {submitting ? "Logging in..." : "Login"}
              </button>
            </fieldset>
          </form>
        </div>
      </MyLayout>
    </>
  );
};

export default Login;
