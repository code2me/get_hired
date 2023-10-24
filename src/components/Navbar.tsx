import React from "react";
import Link from "next/link";
import UserLinks from "./UserLinks";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 bg-white text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link
          className="cursor-pointer px-2 py-2 rounded-md hover:bg-red-500 hover:text-white"
          href="/jobs"
        >
          ALL JOBS
        </Link>
      </div>
      {/* LOGO */}
      <div className="text-3xl md:font-bold flex-1 md:text-center">
        <Link href="/">GET HIRED</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu/>
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <UserLinks/>
      </div>
    </div>
  );
};

export default Navbar;
