import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/components/SearchBox.css";
import { debounce, getGeoData } from "../utils";

const SearchBox = ({ setResults, setLoading, loading, setSearchTerm }) => {
  const [focused, setFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      const response = await getGeoData(setLoading, value);

      if (response) {
        setResults(response);
      }
    }, 750),
    []
  );

  const handleInputChange = (e) => {
    debouncedSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedSearch(e.target.value);
      setSearchTerm(e.target.value);
    }
  };

  return (
    <>
      <div
        className={`searchbox-wrapper ${focused ? "focused" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        <input
          id="searchbar"
          ref={inputRef}
          type="text"
          placeholder="Search places..."
          className={`input-box ${disabled ? "disabled" : ""}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="keyboard-shortcut">Ctrl + /</div>
      </div>
      {loading && <div className="loader"></div>}
    </>
  );
};

export default SearchBox;
