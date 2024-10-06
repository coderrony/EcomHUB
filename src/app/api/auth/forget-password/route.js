import { getUserByEmail, updateUserPassword } from "@/database/queries";
import { connectDB } from "@/services/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  // Connect to the database
  await connectDB();

  const { email, password } = await request.json();

  const foundUser = await getUserByEmail(email);

  if (foundUser === null) {
    return new NextResponse(
      JSON.stringify({
        message: "The email address you entered is not valid",
        status: 409,
      })
    );
  }

  // Password update in MongoDB
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // User password update in MongoDB
  const updateUser = await updateUserPassword(foundUser?.id, hashedPassword);

  return new NextResponse(
    JSON.stringify({
      message: "Password Reset successfully",
      status: 200,
    })
  );
};
