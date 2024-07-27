"use client";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useParams } from "next/navigation";
import { getCurrentDoc, updateDocById } from "@/app/actions";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentDoc(params?.id);
      if (data?.editorState) {
        setEditorState(
          EditorState.createWithContent(convertFromRaw(data.editorState))
        );
      }
    };

    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState);
    try {
      await updateDocById(params?.id, {
        editorState: convertToRaw(editorState.getCurrentContent()),
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
