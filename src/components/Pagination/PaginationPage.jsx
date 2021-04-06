import React from "react";
import { Pagination } from "@material-ui/lab";

const PaginationPage = ({ setPage, numOfPage = 10 }) => {
  const hundlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        with: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        
      }}
    >
      <Pagination
        count={numOfPage}
        color="secondary"
        variant="outlined"
        onChange={(e) => hundlePageChange(e.target.textContent)}
      />
    </div>
  );
};

export default PaginationPage;
