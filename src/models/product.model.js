import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    productName: {
      required: true,
      type: String,
    },
    brand: {
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    category: {
      required: true,
      type: String,
    },
    stockQuantity: {
      required: true,
      type: Number,
    },
    thumbNailUrl: {
      required: true,
      type: String,
    },
    purchases: {
      type: Number,
      default: 0,
    },
    gallery: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const productModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
