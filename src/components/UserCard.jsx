import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { addSingleConnection } from "../utils/connectionSlice";

const UserCard = ({ user, preview }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-2xl max-h-[500px] transition-transform duration-500 ease-in-out">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && <p>{age + " , " + gender.toUpperCase()}</p>}
        <p>{about}</p>
        {!preview && (
          <div className="card-actions justify-between m-4">
            <button
              className="btn btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
