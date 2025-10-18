import { useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  // This ensures the component re-renders cleanly on every navigation
  useEffect(() => {
    window.scrollTo(0, 0); // reset scroll position
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-300">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8">
        <Search />
        <HeroSection />
        <FeaturedProducts key={Date.now()} /> 
        {/* key forces re-render when user navigates back */}
      </main>
    </div>
  );
};

export default Home;
