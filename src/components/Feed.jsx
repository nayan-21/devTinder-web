import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  // console.log(feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(res?.data);
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <p className="p-4 pb-2 text-2xl opacity-70 tracking-wide mb-8 my-6 text-center font-bold">
        Users not found!
      </p>
    );

  return (
    feed && (
      <div className="flex justify-center my-12">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
