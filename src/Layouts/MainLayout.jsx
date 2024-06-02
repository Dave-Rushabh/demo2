import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import TableBox from "../components/TableBox";
import PaginationBox from "../components/PaginationBox";
import "../styles/Layouts/MainLayout.css";

const MainLayout = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="main-layout-container">
      <SearchBox
        setResults={setResults}
        loading={loading}
        setLoading={setLoading}
        setSearchTerm={setSearchTerm}
      />
      <TableBox results={results} />
      <PaginationBox
        results={results}
        setLoading={setLoading}
        searchTerm={searchTerm}
        setResults={setResults}
      />
    </div>
  );
};

export default MainLayout;
