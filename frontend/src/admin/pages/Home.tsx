// Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/1920x1080?landscape')",
      }}
    >
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-sm md:text-lg text-gray-300 uppercase">
          Free Stock Photos & Videos For Your Content
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold text-white mt-4">
          FIND YOUR BEST <span className="text-blue-400">4K DESTINATION</span>
        </h1>
        <div className="mt-8 relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search Your Photos & Videos"
            className="w-full py-3 px-4 rounded-full text-black"
          />
          <button className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-2 rounded-full">
            <i className="fa-solid fa-search"></i>
          </button>
        </div>
        <p className="text-gray-400 mt-4">
          Trending · Minimal · Abstract · Landscape · Nature · B&W · Amoled
        </p>
        <a
          href="#"
          className="text-gray-300 text-sm mt-4 hover:text-white underline"
        >
          Learn more about Terms & Conditions
        </a>
      </div>
    </div>
  );
};

export default Home;
