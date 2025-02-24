import { useState } from "react";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("Rahul@123");

  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      data-theme="valentine"
      className="hero bg-base-200 min-h-screen"
      style={{ minHeight: "82vh" }}
    >
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
          <div className="card-body mt--4">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
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
