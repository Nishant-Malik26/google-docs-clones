"use client";
import React, { useEffect, useState } from "react";
import { Description, People } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { getCurrentDoc } from "@/app/actions";
import "@/app/globals.css";
import Button from "@mui/material/Button";
import Image from "next/image";

const DocIcon = ({ id, filename, user }) => {
  const router = useRouter();

  return (
    <>
      <span onClick={() => router.push("/")} className="cursor-pointer">
        <Description color="primary" />
      </span>
      <div className="flex-grow px-2">
        <h2>{filename}</h2>
        <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
          <p className="option">File</p>
          <p className="option">Edit</p>
          <p className="option">View</p>
          <p className="option">Insert</p>
          <p className="option">Format</p>
          <p className="option">Tools</p>
        </div>
      </div>
      <Button
        className="hidden md:inline-flex h-10"
        variant="contained"
        startIcon={<People />}
      >
        Share
      </Button>
      <Image
        className="rounded-full cursor-pointer ml-2"
        width={50}
        height={50}
        alt="usermig"
        src={user.image}
      ></Image>
    </>
  );
};

export default DocIcon;
