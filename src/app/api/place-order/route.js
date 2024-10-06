import { compareQtyFromCart, processOrder } from '@/database/queries';
import { connectDB } from '@/services/mongo';
import { sendInvoiceEmail } from '@/utils/sendInvoiceEmail';

import { NextResponse } from 'next/server';

export const POST = async request => {
  // connect to database
  await connectDB();
  const { orders, userId, totalAmount, email, mobile } = await request.json();



  try {
    const unavailableProduct = [];

    if (orders.length > 0) {
      // Use Promise.all to wait for all async operations to complete
      await Promise.all(
        orders.map(async cart => {
          const result = await compareQtyFromCart(cart.id, cart.quantity);
          if (result) {
            unavailableProduct.push({ msg: result, id: cart.id });
          }
        }),
      );
    }

    if (unavailableProduct.length > 0) {
      // return error message for unavailable Product which have not matched in our website quantity
      return new NextResponse(
        JSON.stringify({
          message: unavailableProduct,
          status: 400,
        }),
      );
    } else {
      // successfully process order
      const res = await processOrder(orders, userId, totalAmount);

      if (res) {
        const orderId = res.orderId;

        await sendInvoiceEmail({
          to: email,
          subject: 'Ordered Place Successfully',
          totalAmount,
          mobile,
          orderId,
        });

        return new NextResponse(
          JSON.stringify({
            message: 'order confirmed successfully',
            status: 200,
            orderId: orderId,
          }),
        );
      }
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: err.message,
        status: 401,
      }),
    );
  }
};
