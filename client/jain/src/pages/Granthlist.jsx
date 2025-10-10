import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGranth } from "../context/GranthContext";
import { useRef } from "react";
import { useMemo } from "react";

const Granthlist = () => {
  const [formData, setFormData] = useState({
    name: "",
    englishName: "",
    pdf: null,
    image: null,
    coverPhoto: null,
    downloadCount:""
  });
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { granths,              // full list
      paginatedGranths,     // current page list
      currentPage,
      setCurrentPage,
      totalPages,
      itemsPerPage,
      fetchGranths,
      updateGranthInState,
      
       } = useGranth();
  const [search, setSearch] = useState("");
  const pdfRef= useRef(null)
  const imageRef=useRef(null)
  const coverPhotoRef=useRef(null)

  useEffect(() => {
    fetchGranths();
  }, []);

  // Add Granth
  const handleAddGranth = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("englishName", formData.englishName);
    formDataObj.append("pdf", formData.pdf);
    formDataObj.append("image", formData.image);
    formDataObj.append("coverPhoto", formData.coverPhoto);
   

    try {
      await axios.post("http://localhost:5001/api/granths", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGranths();
      if (pdfRef.current && imageRef.current && coverPhotoRef.current) {
      pdfRef.current.value = "";
      imageRef.current.value = "";
      coverPhotoRef.current.value = "";
    }
      setFormData({
    name: "",
    englishName: "",
    pdf: null,
    image: null,
    coverPhoto: null,
  })
    } catch (error) {
      console.error("Error adding Granth:", error);
    }
  };

  // Update Granth
  const handleUpdateGranth = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", editData.name);
    formDataObj.append("englishName", editData.englishName);
   
    if (editData.pdf) formDataObj.append("pdf", editData.pdf);
    if (editData.image) formDataObj.append("image", editData.image);
    if (editData.coverPhoto) formDataObj.append("coverPhoto", editData.coverPhoto);

    try {
      await axios.put(`http://localhost:5001/api/granths/${editData._id}`, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGranths();
      setIsEditing(false);
      if (pdfRef.current && imageRef.current && coverPhotoRef.current) {
      pdfRef.current.value = "";
      imageRef.current.value = "";
      coverPhotoRef.current.value = "";
    }
      setFormData({
    name: "",
    englishName: "",
    pdf: null,
    image: null,
    coverPhoto: null,
  })
    } catch (error) {
      console.error("Error updating Granth:", error);
    }
  };

  const handleEdit = (granth) => {
    setEditData(granth);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Granth?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/granths/${id}`);
      fetchGranths();
    } catch (error) {
      console.error("Error deleting Granth:", error);
    }
  };
const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const query = params.get("search");
  if (query) {
    setSearch(query);
    filteredGranths(query);
  } else {
    fetchGranths(); 
  } // Always set to keep it in sync
}, [location.search]);

useEffect(() => {
  setCurrentPage(1); // go to page 1 on search input change
}, [search]);
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

useEffect(() => {
  fetchGranths();

  const interval = setInterval(() => {
    fetchGranths();
  }, 5000); // refresh every 5 sec

  return () => clearInterval(interval);
}, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
    Granth Management
  </h2>

  {/* Granth Form */}
  <form
    onSubmit={isEditing ? handleUpdateGranth : handleAddGranth}
    className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Granth Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Granth Name</label>
        <input
          type="text"
          value={isEditing ? editData.name : formData.name}
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, name: e.target.value })
              : setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          placeholder="Granth name in Hindi"
          required
        />
      </div>

      {/* English Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">English Name</label>
        <input
          type="text"
          value={isEditing ? editData.englishName : formData.englishName}
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, englishName: e.target.value })
              : setFormData({ ...formData, englishName: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          placeholder="Granth name in English"
        />
      </div>

      {/* Uploads */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, pdf: e.target.files[0] })
              : setFormData({ ...formData, pdf: e.target.files[0] })
          }
          className="w-full border rounded px-3 py-2"
          ref={pdfRef}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Thumbnail Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, image: e.target.files[0] })
              : setFormData({ ...formData, image: e.target.files[0] })
          }
          className="w-full border rounded px-3 py-2"
          ref={imageRef}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Cover Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            isEditing
              ? setEditData({ ...editData, coverPhoto: e.target.files[0] })
              : setFormData({ ...formData, coverPhoto: e.target.files[0] })
          }
          className="w-full border rounded px-3 py-2"
          ref={coverPhotoRef}
        />
      </div>
    </div>

    <button
      type="submit"
      className={`mt-4 w-full md:w-auto px-6 py-2 rounded-lg text-white cursor-pointer ${
        isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {isEditing ? "Update Granth" : "Add Granth"}
    </button>
  </form>

  {/* Search Bar */}
  <div className="flex justify-center mt-8 mb-4 px-4">
    <input
      type="text"
      placeholder="Search Granth..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full max-w-md p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </div>

  {/* Pagination */}
  <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
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
  </div>

  {/* Granth Table */}
  <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 shadow-md">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left font-medium text-gray-700">Name</th>
          <th className="border px-4 py-2 text-left font-medium text-gray-700">English Name</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Thumbnail</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Cover</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">PDF</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Download Count</th>
          <th className="border px-4 py-2 text-center font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {currentGranths.map((granth) => {
  
  const imageUrl = granth.imageUrl
    const pdfUrl = granth.pdfUrl
    const coverUrl = granth.coverPhoto

  return (
    <tr key={granth._id} className="hover:bg-gray-50">
      <td className="border px-4 py-2">{granth.name}</td>
      <td className="border px-4 py-2">{granth.englishName || "-"}</td>

      <td className="border px-4 py-2 text-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="thumb"
            className="w-12 h-12 object-cover mx-auto rounded"
          />
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {coverUrl && (
          <img
            src={coverUrl}
            alt="cover"
            className="w-16 h-16 object-cover mx-auto rounded"
          />
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View PDF
          </a>
        )}
      </td>

      <td className="border px-4 py-2 text-center">{granth.downloadCount || 0}</td>
      <td className="border px-4 py-2 text-center space-x-2">
        <button
          onClick={() => handleEdit(granth)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(granth._id)}
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

export default Granthlist;
