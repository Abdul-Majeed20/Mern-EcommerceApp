import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, getAllProducts } from "./redux-Toolkit/features/product/productActions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// ✅ Toast Component
const Toast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in-right z-50">
    <span className="text-lg">❤️</span>
    <span className="font-medium">{message}</span>
    <button
      onClick={onClose}
      className="ml-2 text-white hover:text-gray-200 text-lg font-bold"
    >
      ×
    </button>
  </div>
);

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector((state) => state.product);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // ✅ Loading Skeleton
  const ProductSkeleton = () => (
    <div className="border border-gray-200 rounded-2xl p-4 animate-pulse">
      <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  // ✅ Product Card
  const ProductCard = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = async (id) => {
      dispatch(addToFavorites(id));
      try {
        setIsFavorite(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.error("Failed to add to favorites:", error);
      }
    };

    return (
      <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full relative">
        {/* Favorite Heart Icon */}
        <button
          onClick={() => handleAddToFavorites(product._id)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 group"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-400 group-hover:text-red-400 transition-colors" />
          )}
        </button>

        {/* Product Image */}
        <div className="bg-gray-100 h-48 rounded-xl mb-4 flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.image ? (
            <img
               src={`http://localhost:3000${product.image}`}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow space-y-3">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {product.category}
            </span>
          </div>

          {product.description && (
            <p className="text-gray-600 text-sm line-clamp-3 h-12 overflow-hidden">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 mt-auto">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of stock"}
            </span>

            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Safely Handle Both Array and Object Data Shapes
  const productsArray = Array.isArray(allProducts)
    ? allProducts
    : allProducts?.data || [];

  const featuredProducts = productsArray.slice(0, visibleProducts);

  return (
    <>
      {showToast && (
        <Toast message="Added to Favourites!" onClose={() => setShowToast(false)} />
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of quality products from trusted sellers
            </p>
          </div>

          {/* ✅ Conditional Rendering */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <svg
                  className="w-12 h-12 text-red-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-red-800 mb-2">
                  Failed to load products
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => dispatch(getAllProducts())}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>

              {productsArray.length > visibleProducts && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleProducts((prev) => prev + 8)}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products available
                </h3>
                <p className="text-gray-600">
                  Check back later for new featured products!
                </p>
              </div>
            </div>
          )}

          {/* ✅ Popular Categories */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["📱 Mobiles", "💻 Electronics", "🚗 Vehicles", "🛋️ Furniture", "👕 Fashion", "🏠 Property"].map(
                (category) => (
                  <div
                    key={category}
                    className="bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl p-4 text-center cursor-pointer transition-colors"
                  >
                    <div className="text-2xl mb-2">{category.split(" ")[0]}</div>
                    <div className="font-medium text-gray-700">{category.split(" ")[1]}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
