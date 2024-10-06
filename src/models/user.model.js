import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    mobile: {
      number: {
        type: String,
        required: false,
      },
      isVerify: {
        type: Boolean,
        default: false,
      },
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'customer', 'seller'],
    },
    shippingAddress: {
      city: { type: String },
      address: { type: String },
      postalCode: { type: String },
    },
    billingAddress: {
      city: { type: String },
      address: { type: String },
      postalCode: { type: String },
    },
    password: {
      required: true,
      type: String,
    },
    profileImg: {
      required: false,
      type: String,
    },
  },
  { timestamps: true },
);

export const userModel =
  mongoose.models.users ?? mongoose.model('users', userSchema);
