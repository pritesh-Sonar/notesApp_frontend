import { NavbarData } from "../data/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { BsPersonSquare } from "react-icons/bs";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const popupRef = useRef();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/user", { email })
      .then((result) => {
        setUserName(result.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("fail to create Note");
      });
  }, [email]);

  useEffect(() => {
    // Get user from localStorage
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
      setEmail(userInfo);
    }
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="relative inline-block" ref={popupRef}>
        {showPopup && user && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
            <p className="font-semibold text-gray-800">{userName}</p>
            <p className="text-sm text-gray-600">{email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-x-5">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold text-xl"
                : "text-white font-medium text-xl"
            }
          >
            {link.title}
          </NavLink>
        ))}
        <p
          className="text-white font-medium text-xl border solid rounded-lg"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          <BsPersonSquare />
        </p>
      </div>
    </>
  );
};

export default Navbar;
