import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"; // Adjust the path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", hindi: "होम", english: "Home" },
    { path: "/directory", hindi: "डायरेक्टरी", english: "Directory" },
    { path: "/granth", hindi: "ग्रन्थ", english: "Granth" },
    { path: "/mandir", hindi: "मंदिर", english: "Mandir" },
    { path: "/contact", hindi: "संपर्क", english: "Contact" },
    // { path: "/userlogin", hindi: "लॉगिन", english: "User Login" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-orange-600 w-full text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Logo" className=" w-48 h-10" />
          <h1 className="text-xl font-bold">दिगंबर जैन</h1>
        </div>

        {/* Hamburger icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
          onClick={() => handleNavigate(item.path)}
          className="hover:underline cursor-pointer flex flex-col items-center"
>
          <span className=" text-pretty">{item.english}</span>
      <span className="text-pretty">{item.hindi}</span>
        </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 px-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.path)}
              className="v flex flex-col w-full text-left hover:underline"
            >
             <span className=" text-pretty">{item.english}</span>
              <span className="text-pretty">{item.hindi}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
