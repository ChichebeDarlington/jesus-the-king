import { useState, useEffect } from "react";
import { Logo, FormData, Alert } from "../components";
import Wrapper from "../assets/wrappers/Reg_LoginWrapper";
import { useContextApp } from "../context/contextApp";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, alertDisplay, registerUser, user, loginUser } =
    useContextApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      alertDisplay();
      return;
    }
    const immediateUser = { name, email, password };
    if (isMember) {
      loginUser(immediateUser);
    } else {
      registerUser(immediateUser);
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name field */}
        {!values.isMember && (
          <FormData
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormData
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormData
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* email field */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-block"
          disabled={isLoading}
        >
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
