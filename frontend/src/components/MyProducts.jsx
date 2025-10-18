import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getMyProducts,
} from "./redux-Toolkit/features/product/productActions";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myProducts, error, loading } = useSelector((state) => state.product);

  console.log("My Products: ", myProducts);

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="border border-gray-200 rounded-2xl p-4">
      <div className="bg-gray-200 h-48 rounded-xl mb-4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-blue-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ProductSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Products</h2>
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
      </div>
    );
  }

  // Show products
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Products</h2>

      {myProducts?.length > 0 || myProducts?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(myProducts.data || myProducts).map((item) => (
            <div
              key={item._id || item.id}
              className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="bg-gray-100 h-48 rounded-xl mb-4 flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                     src={`http://localhost:3000${item.image}`}
                    alt={item.title}
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
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                {item.description && (
                  <div className="flex-grow">
                    <p className="text-gray-600 text-sm line-clamp-3 h-12 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 mt-auto">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                  </span>

                  <button onClick={() => navigate(`/product/${item._id}`)} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty state
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
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't added any products yet. Start by adding your first
              product!
            </p>
            <button
              onClick={() => navigate("/sellProduct")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
