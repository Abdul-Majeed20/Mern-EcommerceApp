import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, addOrder } from "./redux-Toolkit/features/product/productActions";
import { toast } from "react-toastify";

const ProductCart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.product);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [checkoutData, setCheckoutData] = useState({
    quantity: 1,
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleOpenCheckout = (product) => {
    setSelectedProduct(product);
    setCheckoutData({
      quantity: 1,
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setShowCheckout(true);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const { quantity, cardName, cardNumber, expiryDate, cvv } = checkoutData;
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    if (!selectedProduct) {
      toast.error("No product selected for checkout");
      return;
    }

    try {
      const orderData = {
        productId: selectedProduct._id,
        quantity: parseInt(quantity),
      };

      const response = await dispatch(addOrder(orderData));

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Order placed successfully!");
        setShowCheckout(false);
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong while placing the order.");
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-4 border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gray-200 w-20 h-20 rounded-xl animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="h-6 bg-blue-200 rounded w-20 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="animate-fade-in relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row md:items-center md:space-x-4 border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:3000${item.image}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <p className="text-blue-600 font-medium">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout(item)}
                className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all self-start md:self-auto"
              >
                Order Now
              </button>
            </div>
          ))
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Checkout - {selectedProduct.title}
            </h3>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded-lg p-2"
                  value={checkoutData.quantity}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="John Doe"
                  value={checkoutData.cardName}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      cardName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700">Card Number</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="1234 5678 9012 3456"
                  value={checkoutData.cardNumber}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    placeholder="MM/YY"
                    value={checkoutData.expiryDate}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700">CVV</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2"
                    placeholder="123"
                    value={checkoutData.cvv}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        cvv: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
