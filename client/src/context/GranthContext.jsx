import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const GranthContext = createContext();

export const GranthProvider = ({ children }) => {
  const [granths, setGranths] = useState([]);

  useEffect(() => {
    fetchGranths();
  }, []);

  const fetchGranths = async () => {
    try {
      const res = await axios.get(axios.get("http://localhost:5001/api/granths"), {
      headers: { "Cache-Control": "no-cache" } // Force fresh data
    });
    console.log('fetchGranths',res.data);
      setGranths(res.data);
    } catch (error) {
      console.error("Error fetching Granths:", error);
    } 
  };
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 20;

// Derived paginated data from all granths
// const paginatedGranths = granths.slice(
//   (currentPage - 1) * itemsPerPage,
//   currentPage * itemsPerPage
// );
const updateGranthInState = (updatedGranth) => {
    setGranths((prevGranths) =>
      prevGranths.map((granth) =>
        granth._id === granthId
          ? { ...granth, downloadCount: (granth.downloadCount || 0) + 1 }
          : granth
      ))
  };
const totalPages = Math.ceil(granths.length / itemsPerPage);
  return (
    <GranthContext.Provider value={{
      granths,              // full list
           // current page list
      currentPage,
      setCurrentPage,
      totalPages,
      itemsPerPage,
      fetchGranths,
      updateGranthInState,
      setGranths
    }}>
      {children}
    </GranthContext.Provider>
  );
};

export const useGranth = () => {
  return useContext(GranthContext);
};
