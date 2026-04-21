// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export const UserAuthContext = createContext();

// const UserAuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//         const decoded = jwtDecode(token);
//         setUser({ email: decoded.email });
//       }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("userToken", token);
//     localStorage.setItem("isLoggedIn", "true");
//     const decoded = jwtDecode(token);
//     setUser({ email: decoded.email });
//     navigate("/granth");
//   };

//   const logout = () => {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("isLoggedIn");
//     setUser(null);
//     navigate("/userlogin");
//   };

//   return (
//     <UserAuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserAuthContext.Provider>
//   );
// };

// export default UserAuthProvider;
