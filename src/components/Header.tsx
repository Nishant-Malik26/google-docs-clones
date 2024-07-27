import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import { Apps, SearchOutlined } from "@mui/icons-material";
import Image from "next/image";

const Header = ({ session }:any) => {
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <IconButton aria-label="menu" className="h-20 border-0">
        <MenuIcon color="action" />
      </IconButton>
      <IconButton aria-label="desc">
        <DescriptionIcon color="primary" />
      </IconButton>
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
      <div className="mx-5 md:mx-20 flex flexgrow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <SearchOutlined color="action" />
        <input
          type="text"
          placeholder="Search"
          className="text-base flex-grow px-5 bg-transparent outline-none"
        />
      </div>

      <IconButton
        aria-label="apps"
        className="ml-5 md:ml-20 h-20 w-20 border-0"
      >
        <Apps />
      </IconButton>

      <Image
        className="w-12 h-12 rounded-full ml-2 cursor-pointer"
        alt="ico"
        width={500}
        height={500}
        // src="/download.jpeg"
        src={session.user.image}
      />
    </header>
  );
};

export default Header;
