import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    if (feed) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-80 h-96 rounded-2xl bg-gradient-to-br from-rose-200/20 to-purple-200/10 animate-pulse shadow-lg shadow-rose-500/10" />
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-3xl font-semibold text-rose-500 tracking-wide">
          Users not found!
        </p>
        <p className="text-sm text-fuchsia-300/60 mt-2">
          Try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-12 px-4 animate-fade-in">
      <div className="transition-transform duration-500 ease-in-out hover:scale-[1.02]">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
