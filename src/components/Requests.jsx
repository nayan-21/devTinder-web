/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestsSclice";

const Requests = () => {
  const Requests = useSelector((store) => store.requests);
  console.log(Requests);

  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
        // console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!Requests) return;
  if (Requests.length === 0)
    return (
      <p className="p-4 pb-2 text-2xl opacity-70 tracking-wide mb-8 my-6 text-center font-bold">
        Connection Requests Not Found!
      </p>
    );

  return (
    <div className=" my-10">
      <h1 className="p-4 pb-2 text-2xl opacity-70 tracking-wide mb-8 text-center font-bold">
        Requests
      </h1>

      {Requests.map((request) => {
        const { _id, firstName, lastName, about, profileUrl } =
          request.fromUserId;
        console.log(request._id);

        return (
          <div key={_id} className="my-2 ">
            <ul className="list w-6/12 mx-auto bg-base-300 rounded-box shadow-md">
              <li className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={profileUrl} />
                </div>
                <div>
                  <div className="font-semibold text-xl ml-2">
                    {firstName + " " + lastName}
                  </div>
                  <div className="text-xs  font-semibold opacity-60 ml-2">
                    {about || "This is default about"}
                  </div>
                </div>
                <div className="mx-2">
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary mx-1"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
