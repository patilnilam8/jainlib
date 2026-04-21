import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MandirContext = createContext();

export const MandirProvider = ({ children }) => {
  const [mandir, setMandir] = useState([]);

  useEffect(() => {
    fetchMandir();
  }, []);

  const fetchMandir = async () => {
    try {
      const res = await axios.get("${API}/mandir", {
      headers: { "Cache-Control": "no-cache" } // Force fresh data
    });
    console.log('fetchmandir',res.data);
      setMandir(res.data);
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
// const updateGranthInState = (updatedGranth) => {
//     setGranths((prevGranths) =>
//       prevGranths.map((granth) =>
//         granth._id === granthId
//           ? { ...granth, downloadCount: (granth.downloadCount || 0) + 1 }
//           : granth
//       ))
//   };

  return (
    <MandirContext.Provider value={{
      mandir,              // full list
           // current page list
      
      
      fetchMandir,
     
      setMandir
    }}>
      {children}
    </MandirContext.Provider>
  );
};

export const useMandir = () => {
  return useContext(MandirContext);
};
