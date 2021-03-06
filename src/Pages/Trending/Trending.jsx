import axios from "axios";
import React, { useState, useEffect } from "react";
import PaginationPage from "../../components/Pagination/PaginationPage";
import SingleContent from "../../components/SingleContent/SingleContent";
import { API_KEY } from "../../Config/Config";
import "./Trending.css"


const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1)

  const fetchTrending = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
    );
    setContent(data.data.results);
    // console.log(data.data);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="page-title">Trending</span>
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
      <PaginationPage setPage={setPage} />
    </div>
  );
};

export default Trending;
