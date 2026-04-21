// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserAuthContext } from "../context/UserAuthContext";


// const UserLogin = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useContext(UserAuthContext);


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("${API}/users/login", formData);
      
//       alert("User login successful");
//       // localStorage.setItem("isLoggedIn", "true");
      
//       login( res.data.token);
      
//       navigate("/granth");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl font-semibold mb-4 text-center">User Login</h2>
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
//           className="bg-blue-500 text-white px-4 py-2 w-full"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         <p
//           className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
//           onClick={() => navigate("/userregister")}
//         >
//           Don’t have an account? <span className="text-blue-600 font-medium">Register</span>
//         </p>
//       </form>
      
//     </div>
//   );
// };

// export default UserLogin;
