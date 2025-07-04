import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import globeAnimation from '../assets/globe.json';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      {/* 🌍 Main Content */}
      <div className="flex flex-col justify-center items-center px-4 py-12 text-center w-full">
        {/* 🌐 Animation */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-6">
          <Lottie animationData={globeAnimation} loop={true} />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4 px-2 leading-tight">
          🌍 Civic Issue Resolver
        </h1>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-sm sm:max-w-md md:max-w-lg mb-8 px-2">
          A platform to report civic issues like garbage, streetlight, water, etc.
          Help improve your locality by raising a voice!
        </p>

        {/* 🔘 Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center px-2">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded shadow text-center transform transition duration-300 hover:scale-105"
          >
            🔐 Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded shadow text-center transform transition duration-300 hover:scale-105"
          >
            📝 Register
          </Link>
        </div>

        {/* 📘 Footer */}
        <footer className="mt-12 text-xs text-gray-500 dark:text-gray-400 px-4 text-center">
          © {new Date().getFullYear()} Civic Issue Resolver | Made with ❤️ in India
        </footer>
      </div>
    </div>
  );
};

export default Home;
