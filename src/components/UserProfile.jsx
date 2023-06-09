import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utilities/data";
import { client } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
import { fetchUser } from "../utilities/fetchUser";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const loggedInUser = fetchUser();
  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,photography,technology";
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);
  if (!user) {
    return <Spinner message="Loading Profile..." />;
  }

  const handleLogout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/login");
  };
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-image"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === loggedInUser.sub && (
                <button
                  className="p-4 bg-red-500 rounded-md"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout color="white" fontSize={27} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonaryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justity-center font-bold items-center w-full text-xl mt-2">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
