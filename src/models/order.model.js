import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    paymentHistory: {
      paymentMethod: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      payAmount: {
        type: String,
        required: true,
      },
      dueAmount: {
        type: Number,
        required: true,
      },
    },
    totalProducts: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      required: true,
      enum: ['pending', 'shipped', 'delivered', 'canceled'],
    },
  },
  { timestamps: true },
);

export const orderModel =
  mongoose.models.orders ?? mongoose.model('orders', orderSchema);
