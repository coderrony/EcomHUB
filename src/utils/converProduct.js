import mongoose from "mongoose";
export default function convertProductData(product) {
  if (product.sellerId instanceof mongoose.Types.ObjectId) {
    product.sellerId = product.sellerId.toString();
  }
  if (product.createdAt instanceof Date) {
    product.createdAt = product.createdAt.toISOString();
  }
  if (product.updatedAt instanceof Date) {
    product.updatedAt = product.updatedAt.toISOString();
  }
  // Add similar conversions for other fields if necessary
  return product;
}
