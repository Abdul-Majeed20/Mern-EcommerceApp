import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect 
              <span className="block text-yellow-300">Deal Today</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices. 
              Buy, sell, and connect with trusted sellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                🛍️ Start Shopping
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                📱 Sell Something
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-blue-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5K+</div>
                <div className="text-blue-200">Active Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-blue-200">Categories</div>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-2xl transform rotate-6">
                  <div className="bg-gray-200 h-48 w-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">📱</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">iPhone 14 Pro</div>
                    <div className="text-green-600 font-semibold">$999</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-gray-800 p-4 rounded-lg shadow-lg animate-bounce">
                <div className="font-bold">Hot Deal!</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-400 text-white p-3 rounded-full shadow-lg animate-pulse">
                <div className="font-bold">50% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;