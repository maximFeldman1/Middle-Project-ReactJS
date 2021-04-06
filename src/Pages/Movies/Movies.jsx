import axios from "axios";
import React, { useState, useEffect } from "react";
import Genres from "../../components/Genres";
import PaginationPage from "../../components/Pagination/PaginationPage";
import SingleContent from "../../components/SingleContent/SingleContent";
import { API_KEY } from "../../Config/Config";
import useGenre from "../../hooks/useGenre";
import "./Movies.css";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const [numOfPage, setNumOfPage] = useState()

  const fetchMovies = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    // console.log(data.data);
    setContent(data.data.results);
    setNumOfPage(data.data.total_pages)
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="page-title">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />

      <div className="movie">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_data || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPage > 1 && (<PaginationPage setPage={setPage} numOfPage={numOfPage} />
      )}
        
    </div>
  );
};

export default Movies;
