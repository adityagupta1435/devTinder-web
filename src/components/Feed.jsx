import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-3xl font-bold">No User Left!!!</h1>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[currentImageIndex]} preview={false}></UserCard>
      </div>
    )
  );
};

export default Feed;
