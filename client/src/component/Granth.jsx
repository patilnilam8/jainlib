import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGranth } from '../context/GranthContext';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;


const Granth = () => {
  const {  granths,              // full list
      paginatedGranths,     // current page list
      currentPage,
      setCurrentPage,
      totalPages,
      itemsPerPage,
      fetchGranths,
      loading,
      error, } = useGranth();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const location = useLocation();

  
  
  

  console.log(paginatedGranths);
  
 const pages = [];

  // Create array of page numbers for display
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);}
  
    
  
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const query = params.get("search");
  if (query) {
    setSearch(query);
  
  } else {
    fetchGranths(); 
  } // Always set to keep it in sync
}, [location.search]);

useEffect(() => {
  setCurrentPage(1); // go to page 1 on search input change
}, [search]);
useEffect(() => {
  console.log('granths', granths);
   // go to page 1 on search input change
}, []);

  const filteredGranths = useMemo(() => {
  if (!search.trim()) return granths;

  return granths.filter(granth =>
    granth.name.toLowerCase().includes(search.toLowerCase()) ||
    (granth.englishName && granth.englishName.toLowerCase().includes(search.toLowerCase()))
  );
}, [search, granths]);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentGranths = filteredGranths.slice(startIndex, endIndex);
const totalFilteredPages = Math.ceil(filteredGranths.length / itemsPerPage);

const handleDownload = async (granthId) => {
    try {
      const response = await axios.put(`${API}/granths/download/${granthId}`);

const updatedGranth = response.data;

    // Update the granths state manually if needed
    const updatedGranths = granths.map(g =>
      g._id === updatedGranth._id ? updatedGranth : g
    );

      // Update context state with the new granth data (including updated downloadCount)
      // updateGranthInState(response.data);
      console.log('Download count incremented');
      // Trigger file download if needed (optional)
      window.open(updatedGranths.pdfUrl, '_blank'); // Or whichever file link
    } catch (error) {
      console.error("Failed to increment download count", error);
    }
  };

  return (
    <motion.div
  className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-orange-400 to-yellow-400 min-h-screen"
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  
<div className="flex w-full">
  <img
  src="/images/aacharya3.png"
  alt="Bhagwan"
  className="w-full h-auto object-cover rounded-2xl max-h-[70vh] sm:max-h-[80vh] md:max-h-[770px]"
/>

</div>
<h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 text-amber-50 mt-4  md:text-2xl lg:text-3xl xl:text-4xl">
    {t("greeting")}
  </h1>
<h1 className="text-center text-2xl  md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 mb-6 text-amber-50 leading-snug px-0">
  अध्यात्मयोगी, चर्याशिरोमणी, श्रमणाचार्य प.पू. पट्टाचार्य</h1> <h1 className="text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 mb-6 text-amber-50 leading-snug ">श्री १०८  विशुद्धसागरजी महामुनीराज
</h1>


  {/* Search Input */}
  <div className="flex justify-center mb-6">
    <input 
      type="text"
      placeholder="Search Granth..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full max-w-md p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </div>

  {/* Pagination Controls */}
  <div className="flex flex-wrap justify-center items-center gap-2 mt-4 mb-6">
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded cursor-pointer"
    >
      Prev
    </button>

    {Array.from({ length: totalFilteredPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => goToPage(index + 1)}
        className={`px-3 py-1 rounded cursor-pointer ${
          currentPage === index + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalFilteredPages}
      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded cursor-pointer"
    >
      Next
    </button>
  </div>

  {/* Granth Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 max-w-7xl mx-auto">
    {currentGranths.length > 0 ? (
  currentGranths.map((granth, index) => {
   
    const imageUrl = granth.imageUrl
    const pdfUrl = granth.pdfUrl
    const coverUrl = granth.coverPhoto
      console.log(imageUrl);
      
    return (
      <motion.div
        key={granth._id}
        className="w-full sm:w-[300px] p-4 rounded-lg shadow-lg bg-amber-100 flex flex-col items-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        {/* Image */}
        <div className="w-full h-64 flex justify-center items-center mb-3">
          <img 
            src={imageUrl} 
            alt={granth.name}
            className="max-h-full object-contain rounded-lg"
          />
        </div>

        {/* Text Content */}
        <div className="w-full text-center space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold text-amber-950 px-2">
            <span className="w-1/2 truncate">{granth.name}</span>
            <span className="w-1/2 truncate">{granth.englishName}</span>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownload(granth._id)}
              className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Download Granth
            </a>

            <a
              href={coverUrl}
              download
               target="_blank"
               rel="noopener noreferrer"
              className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Download Cover
            </a>
          </div>
        </div>
      </motion.div>
    );
  })
) : (
  <p className="text-center text-amber-700 col-span-full">No granth found.</p>
)}

  </div>
</motion.div>

  );
}

export default Granth;  