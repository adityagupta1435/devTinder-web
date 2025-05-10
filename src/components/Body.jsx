import axios from "axios";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err.message);
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main data-theme="valentine" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
