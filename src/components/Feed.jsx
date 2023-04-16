import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchQuery, feedQuery } from "../utilities/data";
import { client } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if (loading) {
    return <Spinner message="we are adding new ideas to your feed!" />;
  }
  if (!pins?.length) {
    return (
      <div className="flex justify-center font-bold items-center w-full text-xl mt-5">
        No pins available!
      </div>
    );
  }
  return <div>{pins && <MasonaryLayout pins={pins} />}</div>;
};

export default Feed;
