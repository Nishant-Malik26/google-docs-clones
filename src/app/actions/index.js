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
    console.log("🚀 ~ getDocs ~ user:", user._id);
    const docs = await Docs.find({ user: user?._id });
    return docs.map((val) => {
      return { id: val._id.toString(), filename: val.filename };
    });
  } catch (error) {
    console.log(error);
  }
}
