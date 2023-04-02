import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchQuery, feedQuery } from "../utilities/data";
import { client } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  useEffect(() => {
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if (loading) {
    return <Spinner message="we are adding new ideas to your feed!" />;
  }
  return <div>{pins && <MasonaryLayout pins={pins} />}</div>;
};

export default Feed;
