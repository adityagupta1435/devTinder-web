import React, { useState, useEffect } from "react";
import { BASE_URL, GENDER } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import InformationToast from "./infoToast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const age = user?.age;

  const dispatch = useDispatch();
  const handleSaveDetails = async () => {
    setErrorMessage("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          about,
          age,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.response?.data);
    } finally {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  useEffect(() => {
    // handleSaveDetails();
  }, []);

  const openModal = () => setPreview(true);
  const closeModal = () => setPreview(false);
  return (
    <div data-theme="valentine" className="hero bg-base-200 min-h-[82vh]">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl px-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
        <div className="font-bold text-center text-3xl pb-0 my-4">
          Edit Profile
        </div>
        <div className="card-body pt-0">
          <fieldset className="fieldset">
            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label className="fieldset-label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="fieldset-label">Select Gender</label>
            <select
              value={gender.toUpperCase()}
              onChange={(e) => setGender(e.target.value)}
              className="select"
            >
              <option value="" disabled={true}>
                Select Gender
              </option>
              {GENDER.map((gend) => (
                <option key={gend} value={gend.toLocaleLowerCase()}>
                  {gend.toUpperCase()}
                </option>
              ))}
            </select>
            <label className="fieldset-label">Profile Url</label>
            <input
              type="text"
              className="input"
              placeholder="Enter Photo Url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="fieldset-label">About</label>
            <textarea
              className="textarea"
              placeholder="Profile Information"
              value={about}
              maxLength={200}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <button className="btn btn-primary mt-3" onClick={openModal}>
              Preview
            </button>
            <button
              className="btn btn-neutral mt-0"
              onClick={handleSaveDetails}
            >
              Save Profile
            </button>
          </fieldset>
          {preview && (
            <div
              className="fixed top-0 left-0 z-[1000] h-screen w-screen bg-black/85 flex justify-center items-center"
              onClick={closeModal}
            >
              <div
                className="max-w-[90%] max-h-[90%] p-5 shadow"
                style={{ boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <UserCard
                  user={{ firstName, lastName, age, gender, about, photoUrl }}
                  preview={true}
                ></UserCard>
              </div>
            </div>
          )}
          {!errorMessage && showToast && (
            <InformationToast
              type="success"
              message={"Profile Saved Successfully!"}
            ></InformationToast>
          )}

          {showToast && errorMessage && (
            <InformationToast
              type="error"
              message={errorMessage}
            ></InformationToast>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
