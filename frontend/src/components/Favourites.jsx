import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavourites } from "./redux-Toolkit/features/product/productActions";

export default function MyProducts() {
  const dispatch = useDispatch();
  const { favouriteProducts, loading, error } = useSelector((state) => state.product);
  console.log("Fav products from api", favouriteProducts)
  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading favourites...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="animate-fade-in p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Favourite Products</h2>

      {favouriteProducts?.length === 0 ? (
        <p className="text-center text-gray-500">No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favouriteProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={`http://localhost:3000${item.image}`}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  ❤️
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-600">Rs {item.price}</span>
                  <button className="bg-indigo-600 text-white text-sm font-medium py-1 px-4 rounded-lg hover:bg-indigo-700 transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
