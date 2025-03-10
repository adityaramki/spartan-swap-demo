import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">Spartan Swap</h1>

      <ul className="hidden md:flex">
        <li className="p-4">Buy</li>
        <li className="p-4">About</li>
        {user ? (
          <button onClick={handleLogout} className="p-2 bg-red-500 rounded text-white ml-4">
            Logout
          </button>
        ) : null}
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500" : "ease-in-out duration-500 fixed left-[-100%]"}
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">Spartan Swap</h1>
        <li className="p-4 border-b border-gray-600">Home</li>
        <li className="p-4 border-b border-gray-600">Company</li>
        <li className="p-4 border-b border-gray-600">Resources</li>
        <li className="p-4 border-b border-gray-600">About</li>
        <li className="p-4">Contact</li>
        {user ? (
          <button onClick={handleLogout} className="p-2 bg-red-500 rounded text-white mt-4 ml-4">
            Logout
          </button>
        ) : null}
      </ul>
    </div>
  );
};

export default Navbar;
