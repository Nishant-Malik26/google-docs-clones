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
    mongoose.connect(
      "mongodb+srv://nishantmalik2015:qYRh1Om8mNf8G7ih@cluster0.0uzogt3.mongodb.net/docs"
    );
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
