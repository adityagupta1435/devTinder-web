import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  useEffect(() => {
    fetchConnection();
  }, []);

  const dispatch = useDispatch();
  const userConnections = useSelector((store) => store.connections);

  const fetchConnection = async () => {
    if (userConnections) return;

    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  if (!userConnections) return;

  if (userConnections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-3xl font-bold">No Connection Found!!</h1>
      </div>
    );
  }
  return (
    <div className="flex-col my-10">
      <h1 className="text-3xl font-bold text-center">Connections</h1>
      <ul className="list bg-base-300 rounded-box shadow-md my-4 mx-100">
        {userConnections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <li key={_id} className="list-row">
              <div>
                <img className="size-30 rounded-box" src={photoUrl} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {firstName + " " + lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {age + ", " + gender}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {about}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
