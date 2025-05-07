import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user && <EditProfile user={user}></EditProfile>;
};

export default Profile;
