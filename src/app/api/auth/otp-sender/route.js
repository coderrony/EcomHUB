import { storeVerificationOtp } from '@/database/queries';
import { connectDB } from '@/services/mongo';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmail } from '@/utils/sendEmail';

export const POST = async request => {
  // connect to database
  await connectDB();

  const { email, forgetPassword } = await request.json();

  const verificationOtp = crypto.randomInt(100000, 999999).toString();
  // Store the verification otp in Redis
  await storeVerificationOtp(email, verificationOtp);

  // send email
  await sendEmail({
    to: email,
    subject: 'Verify your email address',
    otp: verificationOtp,
    forgetPassword,
  });

  return new NextResponse(
    JSON.stringify({
      message: 'OTP send on your email',
      status: 201,
    }),
  );
};
