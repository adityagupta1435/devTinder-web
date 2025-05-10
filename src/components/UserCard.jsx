import React from "react";

const UserCard = ({ user, preview }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-2xl max-h-[500px]">
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
            <button className="btn btn-error">Ignored</button>
            <button className="btn btn-success">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
