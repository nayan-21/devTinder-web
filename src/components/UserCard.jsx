import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills, about, profileUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={profileUrl} alt="profilePhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName+ " " + lastName} </h2>
        <p>{age && gender && (age + " " + gender)}</p>
        <p>{about}</p>
        <p>{skills}</p>
        <div className="card-actions justify-center my-2 ">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
