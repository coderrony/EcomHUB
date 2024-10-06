import nodemailer from 'nodemailer';
import juice from 'juice';

// Function to generate the email HTML with Tailwind CSS
function generateEmailHTML({ totalAmount, mobile, orderId }) {
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
       We have just received your payment for this order. Your NAGAD Card ${mobile} has been charged with BDT ${totalAmount}. Your Bank Statement will show this transaction as ecomhub, . If you have not authorised the transaction then please reply this email with reason. For refund policy please visit the website (https://www.ecomhub.com).
      </p>

      <p class="font-bold mb-4">
         <a href=${`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pdf-generator/${orderId}`} target="_blank">Download Invoice</a>
      </p>
   
  
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

export async function sendInvoiceEmail({
  to,
  subject,
  totalAmount,
  mobile,
  orderId,
}) {
  const html = generateEmailHTML({ totalAmount, mobile, orderId });

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
