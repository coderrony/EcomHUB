import { productModel } from "@/models/product.model";
import { connectDB } from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Parse the query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = parseInt(searchParams.get("skip")) || 0;
    const category = searchParams
      .getAll("category")
      .map((cat) => decodeURIComponent(cat));

    // Split categories by the '|' separator
    const splitCategories = category.length > 0 ? category[0].split("|") : [];

    const minPrice = parseFloat(searchParams.get("min")) || 0;
    const maxPrice =
      parseFloat(searchParams.get("max")) || Number.MAX_SAFE_INTEGER;
    const searchQuery = searchParams.get("query") || "";

    // Connect to the database
    await connectDB();

    // Build the query object based on the filters
    const query = {};

    if (searchQuery) {
      query.$or = [
        { productName: { $regex: searchQuery, $options: "i" } }, // case-insensitive
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Filter by categories if provided
    if (splitCategories.length > 0) {
      query.category = { $in: splitCategories };
    }

    // Filter by price range if min and/or max are provided
    if (minPrice !== 0 || maxPrice !== Number.MAX_SAFE_INTEGER) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Query the products from MongoDB with pagination and filters
    const products = await productModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .exec();

    // Get the total number of products for pagination info
    const totalProducts = await productModel.countDocuments(query);

    // Send the response with products and pagination info
    return NextResponse.json({
      products,
      totalProducts,
      currentPage: skip / limit + 1,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
