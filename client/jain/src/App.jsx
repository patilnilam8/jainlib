import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Granth from "./component/Granth";
import Directory from "./component/Directory";
import Contact from "./component/Contact";
import Home from "./component/Home";
import Mandir from "./component/Mandir";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Granthlist from "./pages/Granthlist";
import ProtectedRoute from "./pages/ProtectedRoute";
// import UserLogin from "./component/UserLogin";
import Footer from "./component/Footer";
import Mandirlist from "./pages/Mandirlist";
// import UserRegister from "./component/UserRegister";
// import { useGranth } from "./context/GranthContext";
// import { useEffect } from "react";
// import axios from "axios";

// import Header from "./component/Header"



function App() {
  const location = useLocation();
  
  const hideNavbar = location.pathname.startsWith("/dashboard"); // Hide Navbar for admin panel
   const hideFooter = location.pathname.startsWith("/dashboard")
  const userHeaderPaths = ["/", "/granth", "/contact", "/directory", "/mandir","/cart"];

  //   const {  setGranths } = useGranth();

  //  const fetchGranths = async () => {
  //   try {
  //     const res = await axios.get("https://www.digambarjain.in/api/granths", {
  //     headers: { "Cache-Control": "no-cache" } // Force fresh data
  //   });
  //   console.log('fetchGranths',res.data);
  //     setGranths(res.data);
  //   } catch (error) {
  //     console.error("Error fetching Granths:", error);
  //   }  
  // }; 


  // useEffect(() => {
  //     fetchGranths();
  // }, []);

  return (
    <>
    
      
    {!hideNavbar && <Navbar />}  
        

      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/granth" element={<Granth />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/mandir" element={<Mandir />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/userlogin" element={<UserLogin/>} /> */}
        {/* <Route path="/userregister" element={<UserRegister/>} /> */}
        <Route path="/login" element={<Login />} />
       

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />}>
          <Route path="granthlist" element={<Granthlist />} />
          <Route path="mandirlist" element={<Mandirlist />} />
        </Route>
        {/* <Route 
  path="/granth" 
  element={
    <ProtectedRoute>
      <Granth />
    </ProtectedRoute>
  }
/> */}
      </Routes>
      

      {!hideFooter && <Footer />} 
    </>
  );
}

export default App;
