import { Button, Tab, Tabs, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";
import axios from "axios";
import { API_KEY } from "../../Config/Config";
import SingleContent from "../../components/SingleContent/SingleContent";
import PaginationPage from "../../components/Pagination/PaginationPage";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPage] = useState();
  const [searchText, setSearchText] = useState("");

  const fetchSearch = async () => {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      // console.log(data.data);
      setContent(data.data.results);
      setNumOfPage(data.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1 }}
          className="search-box"
          label="Search"
          variant="filled"
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 10 }}
          onClick={fetchSearch}
        >
          <SearchIcon />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
      >
        <Tab style={{ width: "50%" }} label="Search Movie" />
        <Tab style={{ width: "50%" }} label="Search TV-Series" />
      </Tabs>
      <div className="search-box">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_data || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>Series Not Exist</h2> : <h2>Movies Not Exist</h2>)}
      </div>
      {numOfPage > 1 && (
        <PaginationPage setPage={setPage} numOfPage={numOfPage} />
      )}
    </div>
  );
};

export default Search;
