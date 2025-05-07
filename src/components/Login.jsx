import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("Rahul@123");
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

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div data-theme="valentine" className="hero bg-base-200 min-h-[82vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
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
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              {errorMessage && (
                <div role="alert" className="alert alert-error rounded-3xl">
                  <span>{errorMessage}</span>
                </div>
              )}
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
