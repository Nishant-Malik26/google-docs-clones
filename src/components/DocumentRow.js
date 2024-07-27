"use client";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import Icon, { Article, MoreVert } from "@mui/icons-material";
const DocumentRow = ({ id, filename }) => {
  const router = useRouter();
  return (
    <div
      className="flex items- p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Article color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
      {/* <p></p> */}
      <IconButton color="primary" variant="contained" className="border-0">
        <MoreVert />
      </IconButton>
    </div>
  );
};

export default DocumentRow;
