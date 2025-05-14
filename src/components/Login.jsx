import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("S");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      navigate("/");
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err?.response?.data || "Something went wrong!");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      setEmailId("");
      setPassword("");
      setIsLoginForm(true);
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err?.response?.data || "Something went wrong!");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="hero bg-base-200 min-h-[82vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            {isLoginForm ? "Login now!" : "SignUp now!"}
          </h1>
          <p className="py-6">
            Connect with World's best Developers and Enjoy the Social Learning!!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div>
            <h1
              className="font-bold text-center text-3xl py-4 md:py-10"
              style={{ paddingBottom: "0" }}
            >
              👩‍💻 DevTinder
            </h1>
          </div>
          <div className="card-body mt-4">
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <label className="fieldset-label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label className="fieldset-label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <div className="relative">
                <label className="fieldset-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute top-[30px] left-[287px] cursor-pointer"
                  onClick={handleShowPassword}
                >
                  👁
                </div>
              </div>

              {errorMessage && (
                <div role="alert" className="alert alert-error rounded-3xl">
                  <span>{errorMessage}</span>
                </div>
              )}
              <button
                className="btn btn-neutral mt-4"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "SignUp"}
              </button>
              <p
                className="cursor-pointer underline"
                onClick={() => setIsLoginForm((prev) => !prev)}
              >
                {isLoginForm
                  ? "New User? SignUp Here"
                  : "Existing User? Login here"}
              </p>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
