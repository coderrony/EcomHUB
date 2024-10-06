import nodemailer from 'nodemailer';
import juice from 'juice';

// Function to generate the email HTML with Tailwind CSS
function generateEmailHTML({ otp, forgetPassword }) {
  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
    </style>
  </head>
    <body style="color: black; background: white">
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 class="text-2xl font-bold mb-4">
        Welcome to <span class="font-bold">Ecom</span
        ><span class="font-bold" style="color: red">HUB</span>
      </h1>
      <p class="mb-4">
        ${
          forgetPassword
            ? ''
            : "Thank you for registering with EcomHUB. We're excited to have you on board!"
        }
      </p>
      <p class="mb-4">Please ${
        forgetPassword ? 'reset' : 'verify'
      } your email by using the OTP below:</p>
      <div
        class="p-4 border rounded text-center text-lg font-mono max-w-[200px]"
        style="
          letter-spacing: 12px;
          font-weight: bold;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        "
      >
        ${otp}
      </div>
      <h3 class="my-4 text-lg">Have a question or trouble logging in?</h3>
      <p>
        Just reply to this email or contact <br />
        <a href="#" class="text-blue-500 hover:underline"
          >support@ecom-hub.com</a
        >
      </p>
      <p class="mt-6">Best regards,<br />EcomHUB Team</p>
    </div>
  </body>
  </html>
  `;
  return juice(emailTemplate);
}

export async function sendEmail({ to, subject, otp, forgetPassword }) {
  const html = generateEmailHTML({ otp, forgetPassword });

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: {
      name: 'EcomHUB',
      address: 'no-reply@ecom-hub.com',
    },
    to: to,
    subject: subject,
    html: html,
  });
}
