import React, { useState } from "react";
import { urlFor } from "../client";
import { useNavigate } from "react-router-dom";
function Pin({ pin: { image, postedBy, _id, destination } }) {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();

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
        {postHovered && <div className="absolute top-0"></div>}
      </div>
    </div>
  );
}

export default Pin;
