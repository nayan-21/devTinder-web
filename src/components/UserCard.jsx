/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useId } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, skills, about, profileUrl } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={profileUrl} alt="profilePhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName} </h2>
        <p>{age && gender && age + " " + gender}</p>
        <p>{about}</p>
        <p>{skills}</p>
        <div className="card-actions justify-center my-2 ">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}> Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
