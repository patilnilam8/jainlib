// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserRegister = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5001/api/users/register", formData);
//       alert("Registration Successful. You can now login.");
//       navigate("/userlogin");
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl font-semibold mb-4 text-center">User Register</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           className="border p-2 w-full mb-2"
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           className="border p-2 w-full mb-2"
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           className="border p-2 w-full mb-2"
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 w-full"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserRegister;
