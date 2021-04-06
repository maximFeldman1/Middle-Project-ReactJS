import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css"

const API_KEY = "1a39b5eb9917f650dccf07b68eea2690";

const Trending = () => {
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );
    setContent(data.data.results);
    console.log(data.data);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_data || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Trending;
