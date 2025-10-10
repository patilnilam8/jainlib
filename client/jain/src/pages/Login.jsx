import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email:"", password:"" });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", formData);
      // console.log("Server Response:", res.data); // Log full response
      login(res.data.token);
    } catch (error) {
      if (error.response) {
        console.log("Error Response Data:", error.response.data); // Log error details
        console.log("Error Status:", error.response.status);
        alert(error.response?.data?.message || "Invalid credentials");
      } else {
        console.log("Error:", error);
        alert("Something went wrong");
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>} 

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className="border p-2 w-full mb-2"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          className="border p-2 w-full mb-2"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 w-full cursor-pointer" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
