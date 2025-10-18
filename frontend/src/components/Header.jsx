"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  XMarkIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getCurrentUser,
  logoutUser,
} from "./redux-Toolkit/features/user/userActions";

const logo = "/icon.webp";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error, loading } = useSelector((state) => state.user);

  console.log("checking user for header", user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or handle search
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      {/* Top Header */}
      <div className="bg-white py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">OLX</span>
                </div>
              </Link>
            </div>

            {/* Location Selector */}
            <div className="hidden md:flex items-center ml-8">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Pakistan</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Find Cars, Mobile Phones and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Language Selector */}
            <div className="hidden md:flex items-center mr-4">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <span className="text-sm font-medium">ENGLISH</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Login/Sell Buttons */}
            <div className="flex items-center space-x-4">
              {/* Favorites */}
              {/* <button className="hidden md:flex items-center text-gray-700 hover:text-blue-500">
                <HeartIcon className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium hidden lg:inline">
                  Favorites
                </span>
              </button> */}

              {/* Login */}
              {/* Login / Profile Section */}
              {user && user.firstName ? (
                <Popover className="relative">
                  <PopoverButton className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {user.firstName[0].toUpperCase()}
                      </div>
                      <div className="hidden lg:flex flex-col items-start">
                        <span className="text-sm font-medium text-gray-900 leading-none">
                          {user.firstName}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          My Account
                        </span>
                      </div>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                  </PopoverButton>

                  <PopoverPanel
                    transition
                    className="absolute right-0 z-50 mt-3 w-80 bg-white border border-gray-100 rounded-xl shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden"
                  >
                    {/* Header with User Info */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user.firstName[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold text-gray-900 truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {user.email}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-xs text-gray-500">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 p-4 bg-white border-b border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          12
                        </div>
                        <div className="text-xs text-gray-500">Products</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          8
                        </div>
                        <div className="text-xs text-gray-500">Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          4
                        </div>
                        <div className="text-xs text-gray-500">Active</div>
                      </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="p-2">
                      <div
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            My Profile
                          </p>
                          <p className="text-xs text-gray-500">
                            Manage your account
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => navigate("/my-products")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-green-600"
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
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            My Products
                          </p>
                          <p className="text-xs text-gray-500">
                            View your listings
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => navigate("/sellProduct")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Sell Product
                          </p>
                          <p className="text-xs text-gray-500">
                            Create new listing
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Settings & Logout */}
                    <div className="p-2 border-t border-gray-100 bg-gray-50">
                      <div
                        onClick={() => navigate("/settings")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 group mb-2"
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Settings
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          dispatch(logoutUser()).then(() => {
                            navigate("/login");
                          });
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Logout
                          </p>
                          <p className="text-xs text-gray-500">
                            Sign out of your account
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        Last login: Today at 14:30
                      </p>
                    </div>
                  </PopoverPanel>
                </Popover>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-gray-700 hover:text-blue-500 font-medium text-sm"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  <span className="hidden lg:inline">Login</span>
                </Link>
              )}

              {/* Sell Button */}
              <Link
                to="/sellProduct"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium text-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                SELL
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-700"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="bg-white border-t border-gray-100 hidden lg:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-8">
              {/* All Categories Dropdown */}
              <PopoverGroup className="flex items-center space-x-8">
                <Popover className="relative">
                  <PopoverButton className="flex items-center text-gray-700 hover:text-blue-500 font-medium text-sm py-2">
                    ALL CATEGORIES
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </PopoverButton>
                  <PopoverPanel
                    transition
                    className="absolute top-full left-0 z-10 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg transition duration-200 ease-in-out"
                  >
                    <div className="p-2">
                      {[
                        "Mobile Phones",
                        "Cars",
                        "Motorcycles",
                        "Houses",
                        "TV - Video - Audio",
                        "Tablets",
                        "Land & Plots",
                      ].map((category) => (
                        <a
                          key={category}
                          href="#"
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </PopoverPanel>
                </Popover>

                {/* Main Categories */}
                {[
                  "Mobile Phones",
                  "Cars",
                  "Motorcycles",
                  "Houses",
                  "TV - Video - Audio",
                  "Tablets",
                  "Land & Plots",
                ].map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="text-gray-700 hover:text-blue-500 font-medium text-sm py-2"
                  >
                    {category}
                  </a>
                ))}
              </PopoverGroup>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img
                alt="OLX Logo"
                src="https://www.olx.com.pk/assets/iconLogo_noinline.4c103c49a5cb9e002393a53a2cfe0ad6.svg"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                {[
                  "Mobile Phones",
                  "Cars",
                  "Motorcycles",
                  "Houses",
                  "TV - Video - Audio",
                  "Tablets",
                  "Land & Plots",
                  "Favorites",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {/* Login / Profile Section */}
                {user && user.firstName ? (
                  <Popover className="relative">
                    <PopoverButton className="flex items-center text-gray-700 hover:text-blue-500 font-medium text-sm focus:outline-none">
                      <UserIcon className="h-5 w-5 mr-1" />
                      <span className="hidden lg:inline">{user.firstName}</span>
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </PopoverButton>

                    <PopoverPanel
                      transition
                      className="absolute right-0 z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      <div
                        onClick={() => navigate("/dasboard")}
                        className="p-4 hover:bg-gray-50 cursor-pointer rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.firstName[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user.firstName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            My Account
                          </button>
                        </div>
                      </div>
                    </PopoverPanel>
                  </Popover>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center text-gray-700 hover:text-blue-500 font-medium text-sm"
                  >
                    <UserIcon className="h-5 w-5 mr-1" />
                    <span className="hidden lg:inline">Login</span>
                  </Link>
                )}

                <Link
                  to="/register"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
