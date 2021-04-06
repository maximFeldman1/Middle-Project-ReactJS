import React from "react";
import "./SingleContent.css";
import { img_300px, unavailable } from "../../Config/Config";
import { Badge } from "@material-ui/core";

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
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      ></Badge>
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
