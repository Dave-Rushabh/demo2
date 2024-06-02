import React, { useEffect, useState } from "react";
import "../styles/components/PaginationBox.css";
import { getGeoData } from "../utils";

const PaginationBox = ({ results, setLoading, searchTerm, setResults }) => {
  const [blank, setBlank] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const totalPages = Math.ceil(results?.data?.metadata?.totalCount / limit);

  const onPageChange = async (page) => {
    const response = await getGeoData(
      setLoading,
      searchTerm,
      limit,
      (page - 1) * limit
    );

    if (response) {
      setResults(response);
    }
  };

  const isDataEmpty = !results?.data?.data?.length || blank;

  useEffect(() => {
    setCurrentPage(1);
  }, [isDataEmpty]);

  useEffect(() => {
    const elem = document.getElementById("searchbar");
    if (elem && !elem.value.length) {
      setBlank(true);
    } else {
      setBlank(false);
    }
  }, [results]);

  const renderPaginationNumbers = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(
        <button
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => {
            onPageChange(i);
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return paginationNumbers;
  };

  return (
    <>
      {!isDataEmpty && (
        <div className="pagination-container">
          <div className="pagination-numbers">{renderPaginationNumbers()}</div>
          <div className="page-size-input">
            <label htmlFor="pageSize">Cities per page:</label>
            <input
              type="number"
              id="pageSize"
              min="1"
              value={limit}
              onChange={(e) => {
                // const { value } = e.target;
                // if (value > 10) {
                //   alert("Max 10 entries per page is allowed");
                //   return;
                // } else {
                //   setLimit(value); // To Do : change limit in API call
                // }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationBox;
