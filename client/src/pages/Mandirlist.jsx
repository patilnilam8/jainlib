import React from 'react'
import { useState,useRef,useEffect,useMemo } from 'react';
import { useMandir } from '../context/MandirContext';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;
const Mandirlist = () => {
 const [formData, setFormData] = useState({
    name: "",
    address: "",
    images: [],
    contactperson:"",
    contactnumber:""

  });
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const { mandir,              // full list
          // current page list
      currentPage,
      setCurrentPage,
      totalPages,
      itemsPerPage,
      fetchMandir,
     
      
       } = useMandir();
  const [search, setSearch] = useState("");
  
  const imageRef=useRef(null)
 

  useEffect(() => {
    fetchMandir();
  }, []);

  // Add Granth
  const handleAddMandir = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("address", formData.address);
    formDataObj.append("contactperson", formData.contactperson);
   
    formDataObj.append("contactnumber", formData.contactnumber);
    formDataObj.append("location",formData.location)
   
 formData.images.forEach((file) => {
    formDataObj.append("images", file);
  });
    try {
      await axios.post("${API}/mandir", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMandir();
      if ( imageRef.current) {
      
      imageRef.current.value = "";
      
    }
      setFormData({
    name: "",
    address: "",
    
    images: [],
    contactperson: "",
    contactnumber: "",
    location:"",
  })
    } catch (error) {
      console.error("Error adding mandir:", error);
    }
  };

  // Update Granth
  const handleUpdateMandir = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", editData.name);
    formDataObj.append("address", editData.address);
    formDataObj.append("location",editData.location)
   
    if (editData.contactperson) formDataObj.append("contactperson", editData.contactperson);
    
    if (editData.contactnumber) formDataObj.append("contactnumber", editData.contactnumber);
  editData.images.forEach((file) => {
    formDataObj.append("images", file);
  });


    try {
      await axios.put(`${API}/mandir/${editData._id}`, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMandir();
      setIsEditing(false);
      if (imageRef.current ) {
     
      imageRef.current.value = "";
     
    }
      setFormData({
    name: "",
    address: "",
    
    images: [],
    contactperson: "",
    contactnumber: "",
    location:"",
  })
    } catch (error) {
      console.error("Error updating mandir:", error);
    }
  };

  const handleEdit = (mandir) => {
    setEditData(mandir);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Granth?")) return;
    try {
      await axios.delete(`${API}/mandir/${id}`);
      fetchMandir();
    } catch (error) {
      console.error("Error deleting mandir:", error);
    }
  };
// const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

// useEffect(() => {
//   const params = new URLSearchParams(location.search);
//   const query = params.get("search");
//   if (query) {
//     setSearch(query);
//     filteredGranths(query);
//   } else {
//     fetchGranths(); 
//   } // Always set to keep it in sync
// }, [location.search]);

// useEffect(() => {
//   setCurrentPage(1); // go to page 1 on search input change
// }, [search]);
//   const filteredGranths = useMemo(() => {
//   if (!search.trim()) return granths;

//   return granths.filter(granth =>
//     granth.name.toLowerCase().includes(search.toLowerCase()) ||
//     (granth.englishName && granth.englishName.toLowerCase().includes(search.toLowerCase()))
//   );
// }, [search, granths]);

// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;
// const currentGranths = filteredGranths.slice(startIndex, endIndex);
// const totalFilteredPages = Math.ceil(filteredGranths.length / itemsPerPage);

useEffect(() => {
  fetchMandir();

  
  
}, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
    Mandir Management
  </h2>

  {/* Granth Form */}
  <form
    onSubmit={isEditing ? handleUpdateMandir : handleAddMandir}
    className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Granth Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Mandir Name</label>
        <input
          type="text"
          value={isEditing ? editData.name : formData.name}
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, name: e.target.value })
              : setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          placeholder="mandir name in Hindi"
          required
        />
      </div>

      {/* English Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Address</label>
        <textarea
          type="text"
          rows={4}
          value={isEditing ? editData.address : formData.address}
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, address: e.target.value })
              : setFormData({ ...formData, address: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          placeholder="address"
        />
      </div>

      {/* Uploads */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">contact person</label>
        <input
          type="text"
         
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, contactperson: e.target.value })
              : setFormData({ ...formData, contactperson: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        placeholder='contact person name'
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Mandir Image</label>
        <input
          type="file"
          name='images'
           multiple
          accept="image/*"
         
          onChange={(e) =>
            {
    const file = Array.from(e.target.files);
    if (isEditing) {
      setEditData({ ...editData, images: file });
    } else {
      setFormData({ ...formData, images: file });
    }
  }
          }
          className="w-full border rounded px-3 py-2"
          placeholder='upload image'
          ref={imageRef}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
        <input
          type="text"
         
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, contactnumber: e.target.value })
              : setFormData({ ...formData, contactnumber: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          placeholder=' contact number'
        />
      </div>
       <div>
        <label className="block text-gray-700 font-medium mb-1">location</label>
        <input
          type="url"
         
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, location: e.target.value })
              : setFormData({ ...formData, location: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          placeholder=' enter google location url'
          
        />
      </div>
    </div>

    <button
      type="submit"
      className={`mt-4 w-full md:w-auto px-6 py-2 rounded-lg text-white cursor-pointer ${
        isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {isEditing ? "Update Mandir" : "Add Mandir"}
    </button>
  </form>

  {/* Search Bar */}
  <div className="flex justify-center mt-8 mb-4 px-4">
    <input
      type="text"
      placeholder="Search mandir..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full max-w-md p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </div>

  {/* Pagination */}
  {/* <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
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
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
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
  </div> */}

  {/* Granth Table */}
  <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 shadow-md">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left font-medium text-gray-700">Name</th>
          <th className="border px-4 py-2 text-left font-medium text-gray-700">Location</th>
          
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Contact person</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Contact Number</th>
         <th className="border px-4 py-2 text-center font-medium text-gray-700">Image</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {mandir.map((mandirs) => {
  
  const imageUrl = mandirs.imageUrl
    

  return (
    <tr key={mandirs._id} className="hover:bg-gray-50">
      <td className="border px-4 py-2">{mandirs.name}</td>
      <td className="border px-4 py-2">{mandirs.address || "-"}</td>
       <td className="border px-4 py-2">{mandirs.contactperson || "-"}</td>
        <td className="border px-4 py-2">{mandirs.contactnumber || "-"}</td>

      <td className="border px-4 py-2 text-center">
       {imageUrl.map((img, index) => (
        <img
          key={index}
          src={`http://localhost:5001/${img}`} // Or use full BASE_URL
          alt={`mandir-img-${index}`}
          className="w-12 h-12 object-cover rounded"
        />
      ))}
      </td>

     

    

      
      <td className="border px-4 py-2 text-center space-x-2">
        <button
          onClick={() => handleEdit(mandirs)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(mandirs._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
})}

      </tbody>
    </table>
  </div>
</div>


  );
};


export default Mandirlist