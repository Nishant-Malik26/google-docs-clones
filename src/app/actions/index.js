"use server";
import { auth, signIn, signOut } from "@/auth";
import Docs from "@/models/Docs";
import Users from "@/models/User";
import mongoose from "mongoose";

export async function doLogin() {
  await signIn("Google", { redirectTo: "/" });
  const session = await auth();
  const newUser = new Users({
    email: session.user.email,
  });
  await newUser.save();
}
export async function doLogout() {
  await signOut("Google", { redirectTo: "/login" });
}
export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("first");
  } catch (error) {
    console.log(error);
  }
}

export async function create(input) {
  await connectDB();
  const session = await auth();

  try {
    const user = await Users.findOne({ email: session.user.email });
    console.log("🚀 ~ create ~ user:", user);
    const newDoc = new Docs({
      user: user?._id,
      filename: input.input,
    });
    await newDoc.save();
    return {
      user: newDoc.user?.toString() || "",
      filename: newDoc?.filename,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating document");
  }
}

export async function getDocs() {
  await connectDB();

  try {
    const session = await auth();
    const user = await Users.findOne({ email: session.user.email });
    const docs = await Docs.find({ user: user?._id });
    return docs.map((val) => {
      return { id: val._id.toString(), filename: val.filename };
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getSession() {
  const session = await auth();
  return session;
}

export async function getCurrentDoc(id) {
  await connectDB();
  try {
    const docs = await Docs.findOne({ _id: id });
    return {
      id: docs._id.toString(),
      filename: docs.filename,
      editorState: docs.editorState,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateDocById(id, editorState) {
  await connectDB();

  try {
    const doc = await Docs.findByIdAndUpdate(
      id,
      { editorState: editorState.editorState },
      { new: true }
    ).exec();

    if (!doc) {
      throw new Error("Document not found");
    }

    const mod = {
      ...doc._doc,
      _id: doc._doc._id.toString(),
      user: doc._doc.user.toString(),
    };
    return mod;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Error updating document");
  }
}
