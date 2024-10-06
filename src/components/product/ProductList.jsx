"use client";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from "react";
import { replaceMongoIdInArray } from "@/utils/data-util";

const productsPerPage = 5;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const searchParams = useSearchParams();

  // Retrieve and format filter parameters
  const category = searchParams.getAll("category") || [];
  const minPrice = parseFloat(searchParams.get("min")) || 0;
  const maxPrice =
    parseFloat(searchParams.get("max")) || Number.MAX_SAFE_INTEGER;
  const query = searchParams.get("query") || ""; // Get the search query

  // Construct query string
  const categoryQuery = category
    .map((cat) => `category=${encodeURIComponent(cat)}`)
    .join("&");
  const fetchUrl = `/api/products?limit=${productsPerPage}&skip=${
    page * productsPerPage
  }&${categoryQuery}&min=${minPrice}&max=${maxPrice}&query=${encodeURIComponent(
    query
  )}`;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      const getProducts = replaceMongoIdInArray(data?.products);

      if (page === 0) {
        setProducts(getProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...getProducts]);
      }

      setHasMore(data?.products.length > 0);
    };

    fetchProducts();
  }, [fetchUrl, page]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleIntersection);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  // Reset products and page when filters or query change
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [categoryQuery, minPrice, maxPrice, query]);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      {hasMore && (
        <div ref={loaderRef} className="text-primary">
          Loading products...
        </div>
      )}
    </>
  );
}

export default ProductList;
