import mongoose from "mongoose";

export const replaceMongoIdInArray = (array) => {
  return array
    .map((item) => {
      return {
        id: item._id.toString(), // Convert _id to id
        sellerID: item.sellerId?.toString(), // Convert sellerId to sellerID
        ...item,
      };
    })
    .map(({ _id, sellerId, ...rest }) => ({
      ...rest, // Exclude _id and sellerId from the final object
    }));
};

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export function convertProductData(product) {


  if (product.sellerId instanceof mongoose.Types.ObjectId) {
    product.sellerId = product.sellerId.toString();
  }

  if (product.createdAt instanceof Date) {
    product.createdAt = product.createdAt.toISOString();
  }
  if (product.updatedAt instanceof Date) {
    product.updatedAt = product.updatedAt.toISOString();
  }
  const { _id, ...rest } = { ...product, id: product._id.toString() };
  // Add similar conversions for other fields if necessary
  return rest;
}
