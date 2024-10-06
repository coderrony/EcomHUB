import { updateAccountAndShippingAndBilling } from '@/database/queries';
import { connectDB } from '@/services/mongo';
import { NextResponse } from 'next/server';

export const POST = async request => {
  // connect to database
  await connectDB();

  const {
    firstName,
    lastName,
    email,
    city,
    postCode,
    address,
    phone,
    operation,
    id
  } = await request.json();

  const result = await updateAccountAndShippingAndBilling({
    firstName,
    lastName,
    email,
    city,
    postCode,
    address,
    phone,
    operation,
    id
  });

  if (result) {
    return new NextResponse(
      JSON.stringify({
        message: 'Update Account Successfully',
        status: 200,
        user: result,
      }),
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: 'Invalid details',
      status: 400,
    }),
  );
};
