import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Request = () => {
  useEffect(() => {
    fetchRequests();
  }, []);

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-3xl font-bold">No Request Found!!</h1>
      </div>
    );
  }
  return (
    <div className="flex-col my-10">
      <h1 className="text-3xl font-bold text-center">Connections</h1>
      <ul className="list bg-base-300 rounded-box shadow-md my-4 mx-100">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId;
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
                <div className="text-xs uppercase font-semibold opacity-60 w-[350px]">
                  {about}
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn btn-success my-2"
                  onClick={() => handleRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-soft btn-error my-2"
                  onClick={() => handleRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Request;
