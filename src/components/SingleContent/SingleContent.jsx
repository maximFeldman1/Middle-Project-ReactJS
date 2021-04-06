import React from "react";
import './SingleContent.css'
import { img_300px, unavailable } from "../../Config/Config";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <div className="media">
      <img
        className="poster"
        src={poster ? `${img_300px}/${poster}` : unavailable}
        alt={title}
      />
      <p className="title">{title}</p>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle"> {date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
