import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyProducts from "../components/MyProducts";
import Favourites from "../components/Favourites";
import ProductCart from "../components/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getCurrentUser } from "../components/redux-Toolkit/features/user/userActions";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  // Mock user data - replace with actual API call
  // ✅ Fetch current user once
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // ✅ Update userData only when `user` changes
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUserData({
        name: user.firstName || "Guest User",
        email: user.Email || "Not provided",
        joinDate: "January 2024",
        productsCount: 12,
        ordersCount: 5,
        favoritesCount: 8,
        cartItemsCount: 3,
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  const menuItems = [
    {
      id: "products",
      label: "My Products",
      icon: "📦",
      count: userData?.productsCount,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: "🛒",
      count: userData?.ordersCount,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: "❤️",
      count: userData?.favoritesCount,
    },
    {
      id: "cart",
      label: "Shopping Cart",
      icon: "🛍️",
      count: userData?.cartItemsCount,
    },
    { id: "profile", label: "Profile Settings", icon: "👤" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <MyProducts />;
      case "orders":
        return <MyOrders />;
      case "favorites":
        return <Favourites />;
      case "cart":
        return <ProductCart />;
      case "profile":
        return <ProfileSettings />;
      default:
        return <MyProducts />;
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 bg-white shadow-2xl min-h-screen animate-slide-in">
            {/* User Profile Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {userData.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                  <p className="text-gray-500 text-xs">
                    Member since {userData.joinDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeTab === item.id
                          ? "bg-white text-blue-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 animate-fade-in">
            <div className="max-w-6xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Welcome back, {userData.name}!
                </h1>
                <p className="text-gray-600 text-lg">
                  Here's what's happening with your account today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">My Products</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {userData.productsCount}
                      </p>
                    </div>
                    <div className="text-3xl">📦</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Orders</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {userData.ordersCount}
                      </p>
                    </div>
                    <div className="text-3xl">🛒</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Favorites</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {userData.favoritesCount}
                      </p>
                    </div>
                    <div className="text-3xl">❤️</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Cart Items</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {userData.cartItemsCount}
                      </p>
                    </div>
                    <div className="text-3xl">🛍️</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Content Area */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Placeholder Components - Replace with actual implementations

const MyOrders = () => (
  <div className="animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div
          key={order}
          className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-6 bg-green-200 rounded-full px-3 py-1 text-sm font-medium animate-pulse">
              Delivered
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);



const ProfileSettings = () => (
  <div className="animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
    <div className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Phone Number
        </label>
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Address
        </label>
        <div className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
      <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
        Update Profile
      </button>
    </div>
  </div>
);

// Add these animations to your global CSS
const styles = `
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default UserDashboard;
