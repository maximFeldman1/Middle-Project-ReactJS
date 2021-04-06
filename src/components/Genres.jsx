import { Chip } from "@material-ui/core";
import axios from "axios";
import React, {useEffect } from "react";
import { API_KEY } from "../Config/Config";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleDelete = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((select) => select.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
    );
    //   console.log(data.data);
    setGenres(data.data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return()=>{
        setGenres({});
    }
  }, []);

  return (
    <div
      style={{
        padding: "6px 0",
      }}
    >
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 3 }}
            clickable
            onDelete={()=>handleDelete(genre)}
            color="secondary"
            key={genre.id}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 3 }}
            clickable
            color="primary"
            key={genre.id}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
