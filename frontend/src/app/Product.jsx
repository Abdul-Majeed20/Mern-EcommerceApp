import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails , addToCart } from "../components/redux-Toolkit/features/product/productActions";
import "../App.css";
import Header from "../components/Header";
// import { addToCart } from "../components/redux-Toolkit/features/cart/cartActions"; // ✅ Add this if you already have a cart action

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, productDetails } = useSelector(
    (state) => state.product
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const handleShowPhoneNumber = () => {
    setShowPhoneNumber(true);
  };

  const handleAddToCart = () => {
    if (productDetails) {
      dispatch(addToCart(productDetails._id));
      setShowCartMessage(true);
      setTimeout(() => setShowCartMessage(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-error">
        <h3>Error loading product</h3>
        <p>{error}</p>
        <button onClick={() => dispatch(getProductDetails(id))}>
          Try Again
        </button>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="product-not-found">
        <h3>Product not found</h3>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const {
    title,
    price,
    originalPrice,
    location,
    postedDate,
    category,
    condition,
    description,
    image,
    images = [],
    seller = {},
    features = [],
  } = productDetails;

  return (
    <>
      <Header />

      {/* ✅ Toast Notification for Add to Cart */}
      {showCartMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✅ Product added to cart!
        </div>
      )}

      <div className="product-page">
        <div className="product-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <span>Home</span> &gt; <span>{category}</span> &gt;{" "}
            <span className="current">{title}</span>
          </div>

          <div className="product-content">
            {/* Left Column - Images */}
            <div className="product-images">
              <div className="main-image">
                <img
                  src={`http://localhost:3000${image}`}
                  alt={title}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
              </div>
              <div className="image-thumbnails">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`http://localhost:3000${img}`}
                      alt={`${title} ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="product-details">
              <div className="product-header">
                <h1 className="product-title">{title}</h1>
                <div className="price-section">
                  <span className="current-price">${price}</span>
                  {originalPrice && (
                    <span className="original-price">${originalPrice}</span>
                  )}
                </div>
                <div className="product-meta">
                  <span className="location">
                    <i className="location-icon">📍</i> {location}
                  </span>
                  <span className="posted-date">
                    <i className="time-icon">🕒</i> {postedDate}
                  </span>
                </div>
              </div>

              <div className="product-info">
                <div className="info-item">
                  <span className="label">Condition:</span>
                  <span className="value">{condition}</span>
                </div>
                <div className="info-item">
                  <span className="label">Category:</span>
                  <span className="value">{category}</span>
                </div>
              </div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{description}</p>
              </div>

              {features.length > 0 && (
                <div className="product-features">
                  <h3>Features</h3>
                  <ul>
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Seller Info Card */}
            <div className="seller-card">
              <div className="seller-info">
                <div className="seller-avatar">
                  {seller.name ? seller.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="seller-details">
                  <h4>{seller.name || "Seller"}</h4>
                  <p>Member since {seller.memberSince || "2023"}</p>
                </div>
              </div>

              <div className="contact-actions">
                {!showPhoneNumber ? (
                  <button
                    className="show-phone-btn"
                    onClick={handleShowPhoneNumber}
                  >
                    <span>📞</span> Show Phone Number
                  </button>
                ) : (
                  <div className="phone-number">
                    <span className="phone-icon">📞</span>
                    <span className="number">
                      {seller.phone || "+92 XXXXX XXXXX"}
                    </span>
                  </div>
                )}

                <button className="chat-btn">
                  <span>💬</span> Chat with Seller
                </button>
              </div>

              <div className="safety-tips">
                <h5>Safety Tips</h5>
                <ul>
                  <li>Meet seller in a public place</li>
                  <li>Check the item before buying</li>
                  <li>Never pay in advance</li>
                </ul>
              </div>

              {/* ✅ Add to Cart Button */}
              <div className="mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="similar-products">
            <h3>Similar Products</h3>
            <div className="similar-products-grid">
              <div className="similar-product-card">
                <p>Similar products will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
