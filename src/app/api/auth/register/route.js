import { getUserByEmail } from "@/database/queries";
import { connectDB } from "@/services/mongo";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  // connect to database
  await connectDB();

  const { email } = await request.json();

  // user already exists or not
  const foundUser = await getUserByEmail(email);
  if (foundUser !== null) {
    return new NextResponse(
      JSON.stringify({
        message:
          "The email address you entered is already registered. Please use a different email.",
        status: 409,
      })
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/auth/otp-sender`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, forgetPassword: false }),
  });

  const responseData = await res.json();

  if (responseData?.status === 201) {
    return new NextResponse(
      JSON.stringify({
        message: "Please check your email for the verification OTP",
        status: 201,
      })
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        message: "invalid credentials, please try later",
        status: 404,
      })
    );
  }
};
