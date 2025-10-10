import { useState,useRef,useEffect,useMemo } from 'react';
import { useMandir } from '../context/MandirContext';
import axios from 'axios';

const Mandir = () => {

  const { mandir,              // full list
            // current page list
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        fetchMandir,
       
        
         } = useMandir();

  return (
 <div className="bg-gradient-to-b from-orange-500 to-yellow-400 min-h-screen py-12 px-4">
  <div className="flex flex-col space-y-12">
    {mandir.map((mandir, index) => (
      <div
        key={mandir.id}
        className={`flex ${
          index % 2 === 0 ? 'justify-start' : 'justify-end'
        }`}
      >
        <div
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          } bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl`}
        >
          {/* Image Section */}
          <div className="md:w-1/2 w-full h-[300px]">
            <img
              src="/images/mandirhome.jpeg"
              alt={mandir.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 w-full p-6 flex flex-col justify-center space-y-3">
            <h3 className="text-2xl font-bold text-orange-600">{mandir.name}</h3>
            <p><span className="font-semibold">स्थान:</span> {mandir.address}</p>
            <p><span className="font-semibold">संपर्क :</span> {mandir.contactperson}</p>
            <p><span className="font-semibold">फोन:</span> {mandir.contactnumber}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  )
}

export default Mandir