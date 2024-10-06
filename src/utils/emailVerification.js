import { getUserByEmail, storeVerificationOtp } from '@/database/queries';
import { sendEmail } from '@/utils/sendEmail';
import crypto from 'crypto';
export default async function emailVerification(email) {
  const user = await getUserByEmail(email);

  const verificationOtp = crypto.randomInt(100000, 999999).toString();
  // Store the verification otp in Redis
  await storeVerificationOtp(user.id, verificationOtp);

  // send email
  await sendEmail({
    to: email,
    subject: 'Verify your email address',
    otp: verificationOtp,
  });
}
