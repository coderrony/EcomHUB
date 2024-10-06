import { addUser, checkVerificationOtp } from "@/database/queries";
import { connectDB } from "@/services/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  // Connect to the database
  await connectDB();

  const { firstName, lastName, email, password, otp, forgetPassword } =
    await request.json();

  const isValidOtp = await checkVerificationOtp(email, otp);

  if (!isValidOtp) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid verification Otp",
        status: 400,
      })
    );
  }

  if (!forgetPassword) {
    // Account creation in MongoDB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      firstName,
      lastName,
      email,
      role: "customer",
      password: hashedPassword,
    };

    // User creation in MongoDB
    const user = await addUser(data);
    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully",
        status: 200,
        user: user,
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "otp verification completed",
      status: 200,
    })
  );
};
