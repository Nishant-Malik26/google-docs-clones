import Image from "next/image";
import Header from "../components/Header";
import { Folder, LogoutRounded, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { doLogout } from "./actions";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (!session?.user) return redirect("/login");
  const props = {
    session: session,
  };
  return (
    <>
      <Header {...props} />
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
          <div>
            <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
              <Link href="?modal=true">
                <Image
                  alt="newdoc"
                  src="https://links.papareact.com/pju"
                  layout="fill"
                />
              </Link>
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="p-10 md:px-0 bg-white">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex item items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Folder color="action" />
          </div>
        </div>
        <form action={doLogout}>
          <IconButton type="submit">Logout</IconButton>
        </form>
      </section>
    </>
  );
}
