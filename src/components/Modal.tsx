"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { connectDB, create } from "@/app/actions";
import { auth } from "@/auth";

function Modall() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [input, setInput] = useState("");
  //   const [session, setSession] = useState<any | null>(null);

  const modal: boolean = !!searchParams.get("modal");
  const pathname = usePathname();
  console.log("🚀 ~ Modall ~ pathname:", pathname);
  const createDocument = async () => {
    if (!input) return;
    try {
      await create({ input });
      setInput("");
      router.push(pathname);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {
        <Modal open={modal}>
          <div className="outline-none w-1/4 m-auto bottom-0 pt-64">
            <div className="bg-[#F8F9FA] h-44 p-3">
              Create a new document
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="w-full outline-none rounded px-1 mt-2 text-black-900 bold"
                placeholder="Enter Name of the document"
                onKeyDown={(e) => e.key === "Enter" && createDocument()}
              ></input>
            </div>
            <div className="flex items-center justify-between bg-white p-3">
              <Link href={pathname}>
                <Button className="bg-blue-500 text-white p-1 rounded">
                  Cancel
                </Button>
              </Link>

              <Button
                onClick={createDocument}
                variant="contained"
                className="bg-blue-500 text-white p-1 rounded"
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}

export default Modall;
