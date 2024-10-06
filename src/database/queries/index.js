import { emailVerificationExpire } from '@/lib/utils';
import { orderModel } from '@/models/order.model';
import { productModel } from '@/models/product.model';
import { userModel } from '@/models/user.model';

import {
  convertProductData,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '@/utils/data-util';
import redis from '@/utils/redis';

export const getUserByEmail = async email => {
  const user = await userModel.find({ email: email }).lean();
  if (user?.length === 0) {
    return null;
  }

  return replaceMongoIdInObject(user[0]);
};

export async function addUser(data) {
  // Implement this function to add a user to your database
  const user = await userModel.create(data);

  return {
    id: user?._id.toString(),
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    mobile: user?.mobile,
    role: user?.role,
    isVerified: user?.isVerified,
    profileImg: user?.profileImg,
  };
}

export async function storeVerificationOtp(email, otp) {
  // Implement this function to store the verification otp in redis
  const key = `verificationOtp:${email}`;
  await redis.set(key, otp, 'EX', emailVerificationExpire); // Expire in 5 minutes
}

export async function checkVerificationOtp(userId, otp) {
  // Implement this function to check the verification otp from redis
  const key = `verificationOtp:${userId}`;
  const storedOtp = await redis.get(key);

  return storedOtp === otp;
}

export async function verifyUser(userId) {
  try {
    // Find the user by ID and update the isVerified field to true
    const result = await userModel.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }, // This option returns the updated document
    );

    return result;
  } catch (error) {
    console.error('Error verifying user: ', error);
    throw new Error('Error verifying user');
  }
}
export async function updateUserPassword(userId, password) {
  try {
    // Find the user by ID and update the isVerified field to true
    const result = await userModel.findByIdAndUpdate(
      userId,
      { password: password },
      { new: true }, // This option returns the updated document
    );

    return result;
  } catch (error) {
    throw new Error('Error verifying user');
  }
}

export const getNewArrivalsProducts = async productLimit => {
  try {
    // Fetch the latest 10 products (you can adjust the limit as needed)
    const newArrivals = await productModel
      .find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(productLimit)
      .lean(); // Limit the number of products

    return replaceMongoIdInArray(newArrivals);
  } catch (error) {
    throw new Error('new arrivals not available');
  }
};

export const getTrendingProducts = async productLimit => {
  try {
    const trendingProducts = await productModel.aggregate([
      {
        $addFields: {
          stringId: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'purchases',
          localField: 'stringId',
          foreignField: 'productId',
          as: 'purchasesHistory',
        },
      },
      {
        $lookup: {
          from: 'ratings',
          localField: 'stringId',
          foreignField: 'productId',
          as: 'ratingsHistory',
        },
      },
      // Separate the sum of purchases
      {
        $addFields: {
          totalPurchases: {
            $sum: '$purchasesHistory.quantity',
          },
        },
      },
      // Separate the average rating
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: {
                $gt: [{ $size: '$ratingsHistory' }, 0],
              }, // Check if there are ratings
              then: {
                $avg: '$ratingsHistory.rating',
              },
              else: 0,
            },
          },
        },
      },
      {
        $sort: {
          totalPurchases: -1, // Sort by total purchases in descending order
          averageRating: -1, // Sort by average rating in descending order
        },
      },
      {
        $limit: productLimit,
      },
      {
        $project: {
          id: { $toString: '$_id' },
          _id: 0,
          productName: 1,
          price: 1,
          thumbNailUrl: 1,
          totalPurchases: 1,
          averageRating: 1,
          stockQuantity: 1,
        },
      },
    ]);

    return trendingProducts;
  } catch (err) {
    console.error('Error fetching trending products:', err);
    throw new Error(err.message);
  }
};

export const getDistinctCategories = async () => {
  try {
    const categories = await productModel.distinct('category');

    return categories;
  } catch (error) {
    console.error('Error fetching distinct categories:', error);
  }
};

export const getProductAndRelatedProduct = async id => {
  try {
    // Fetch the product by ID
    const product = await productModel.findById(id).lean();

    if (!product) {
      throw new Error('Product not found');
    }

    // Find related products
    const relatedProducts = await productModel.aggregate([
      {
        $match: {
          $or: [
            { category: product.category },
            { brand: product.brand },
            { description: product.description },
          ],
        },
      },
    ]);

    return {
      singleProduct: convertProductData(product),
      relatedProducts: replaceMongoIdInArray(relatedProducts),
    };
  } catch (error) {
    throw new Error('Error fetching product and related products');
  }
};

export const updateAccountAndShippingAndBilling = async data => {
  const {
    firstName,
    lastName,
    email,
    city,
    postCode,
    address,
    phone,
    operation,
    id,
  } = data;
  let updatedUser = null;

  try {
    if (operation === 'billing') {
      updatedUser = await userModel.findOneAndUpdate(
        { _id: id }, // Find user id
        {
          $set: {
            firstName,
            lastName,
            email,
            'mobile.number': phone,
            'billingAddress.city': city,
            'billingAddress.address': address,
            'billingAddress.postalCode': postCode,
          },
        },
        { new: true, runValidators: true }, // Return updated document and apply validation
      );
    } else {
      updatedUser = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            firstName,
            lastName,
            email,
            'mobile.number': phone,
            'shippingAddress.city': city,
            'shippingAddress.address': address,
            'shippingAddress.postalCode': postCode,
          },
        },
        { new: true, runValidators: true },
      );
    }

    if (updatedUser) {
      return {
        id: updatedUser?._id.toString(),
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        email: updatedUser?.email,
        mobile: updatedUser?.mobile,
        role: updatedUser?.role,
        profileImg: updatedUser?.profileImg,
        shippingAddress: updatedUser?.shippingAddress,
        billingAddress: updatedUser?.billingAddress,
      };
    } else {
      return null;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProductById = async productId => {
  try {
    const product = await productModel.findById(productId).lean();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Could not retrieve product.');
  }
};

export const compareQtyFromCart = async (productId, cartQty) => {
  const product = await getProductById(productId);

  if (product.stockQuantity === 0) {
    return `The ${product.productName} are currently out of stock please remove ${product.productName} from cart `;
  }

  if (product.stockQuantity < cartQty) {
    return `The ${product.productName} are available in a quantity of ${
      product.stockQuantity
    } on our website, but you have selected ${cartQty}. Please remove ${
      cartQty - product.stockQuantity
    } items from your cart to proceed with the correct quantity.`;
  }
  return false;
};

export const processOrder = async (orders, userId, totalAmount) => {
  try {
    // Loop through each order
    for (const order of orders) {
      // Find the product by ID and update the stock quantity
      await productModel.findByIdAndUpdate(
        order.id, // Product ID from the order
        {
          $inc: { stockQuantity: -order.quantity }, // Decrease stockQuantity by order quantity
        },
        { new: true }, // Return the updated document
      );
    }

    // Create a new order document
    const newOrder = await orderModel.create({
      userId,
      paymentHistory: {
        paymentMethod: 'Online Payment',
        transactionId: 'NDG3253DG435RE44',
        payAmount: '120.00',
        dueAmount: totalAmount - 120,
      },
      totalProducts: orders, // This should be an array of product objects
      totalPrice: totalAmount,
      orderStatus: 'pending',
    });

    return {
      orderId: newOrder?._id.toString(),
    };
  } catch (error) {
    console.error('Error updating stock quantities: ', error);
    throw new Error(error);
  }
};

export const getOrderById = async orderId => {
  try {
    const order = await orderModel.findById(orderId).lean();

    return order;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Could not retrieve product.');
  }
};

export const getUserById = async userId => {
  try {
    const user = await userModel.findById(userId).lean();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Could not retrieve user.');
  }
};
