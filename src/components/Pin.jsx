import React, { useState } from "react";
import { urlFor } from "../client";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { fetchUser } from "../utilities/fetchUser";
function Pin({ pin: { image, postedBy, _id, destination, save } }) {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const userInfo = fetchUser();
  let alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === userInfo?.aud
  )?.length;

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            style={{ height: "100%" }}
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 z-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdDownloadForOffline className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none" />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  Saved
                </button>
              ) : (
                <button className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin;
