import axios from "axios";

export const getGeoData = async (
  setLoading,
  searchTerm,
  limit = 5,
  offset = 0
) => {
  try {
    setLoading(true);
    var options = {
      method: "GET",
      url: import.meta.env.VITE_API_URL,
      params: {
        countryIds: "IN",
        namePrefix: searchTerm,
        limit: limit,
        offset: offset,
      },
      headers: {
        "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      },
    };

    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error, "<== error while fetching the gro data");
    alert("something went wrong !!");
  } finally {
    setLoading(false);
  }
};

export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
