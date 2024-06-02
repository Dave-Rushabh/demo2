import React, { useEffect, useState } from "react";
import "../styles/components/TableBox.css";

const TableBox = ({ results }) => {
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    const elem = document.getElementById("searchbar");
    if (elem && !elem.value.length) {
      setBlank(true);
    } else {
      setBlank(false);
    }
  }, [results]);

  const renderTableRows = () => {
    if ((Array.isArray(results) && !results.length) || blank) {
      return (
        <tr>
          <td colSpan="3" className="no-result">
            {"Start Searching"}
          </td>
        </tr>
      );
    }
    if (results?.data?.data?.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="no-result">
            {"No result found"}
          </td>
        </tr>
      );
    }

    return results?.data?.data?.map((result, index) => (
      <tr key={result.id}>
        <td>{index + 1}</td>
        <td>{result.name}</td>
        <td>
          {result.country}
          {result.countryCode && (
            <img
              src={`https://flagsapi.com/${result.countryCode}/flat/64.png`}
              alt={`${result.country} flag`}
              className="country-flag"
            />
          )}
        </td>
      </tr>
    ));
  };

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};

export default TableBox;
