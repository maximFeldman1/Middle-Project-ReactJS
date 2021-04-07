import React from "react";
import "./SingleContent.css";
import { img_300px, unavailable } from "../../Config/Config";
import { Badge } from "@material-ui/core";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
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
    </ContentModal>
  );
};

export default SingleContent;
