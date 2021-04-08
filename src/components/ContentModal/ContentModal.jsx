import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { Button } from "@material-ui/core";
import { API_KEY, img_500px, unavailable } from "../../Config/Config";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./ContentModal.css";
import Carousel from "../Carousel/Carousel"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "90%",
    backgroundColor: "#000000",
    border: "8px solid #1565c0",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );
    setContent(data.data);
  };

  const fetchVideo = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    setVideo(data.data.results[0]?.key);
    // console.log(data.data);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="content-modal">
                <img
                  className="content-portrait"
                  src={
                    content.poster_path
                      ? `${img_500px}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.title || content.name}
                />
                <img
                  className="content-landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500px}/${content.backdrop_path}`
                      : unavailable
                  }
                  alt={content.title || content.name}
                />
                <div className="content-modal-about">
                  <span className="content-modal-title">
                    {content.title || content.name}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="content-modal-description">
                    {content.overview}
                  </span>
                  <div>
                    {/* <Carousel media_type={media_type} id={id}/> */}

                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="primary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Click For Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
