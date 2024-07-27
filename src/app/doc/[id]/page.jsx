import React from "react";
import { getCurrentDoc, getSession } from "@/app/actions";
import { redirect } from "next/navigation";
import DocIcon from "@/components/DocIcon";
import TextEditor from "@/components/TextEditor";

const Doc = async ({ params }) => {
  const session = await getSession();
  const { id } = params;

  const doc = await getCurrentDoc(id);

  if (!session?.user) return redirect("/login");
  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <DocIcon {...doc} {...session} />
      </header>
      <TextEditor/>
    </div>
  );
};

export default Doc;
