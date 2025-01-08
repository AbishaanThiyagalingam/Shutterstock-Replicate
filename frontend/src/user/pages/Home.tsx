// Home.tsx
import React from "react";
import Header from "../components/Header";
import bgImage from "../../images/home-page-background.jpeg";

const Home: React.FC = () => {
  return (
    <>
      <section
        id="home"
        className="dark:bg-[#000000] relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp max-w-[600px] text-left"
                data-wow-delay=".2s"
              >
                <h2 className="mb-4 text-xl font-medium text-gray-300">
                  Free Stock Photos & Videos For Your Content
                </h2>
                <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
                  FIND YOUR BEST <br /> 4K DESTINATION
                </h1>
                <div className="relative mt-8">
                  <input
                    type="text"
                    placeholder="Search Your Photos & Videos"
                    className="w-full rounded-[20px] border border-white bg-transparent py-3 px-6 pr-14 text-base text-white placeholder-white focus:border-white focus:ring-white focus:outline-none"
                  />
                  <button className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-transparent p-2 hover:bg-white transition flex items-center justify-center group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white" /* Default color is white */
                      className="h-5 w-5 group-hover:stroke-black" /* Changes to black on hover */
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M10.5 16.5a6 6 0 100-12 6 6 0 000 12z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-300">
                  Trending: Minimal, Abstract, Landscape, Nature, B&W, Amoled
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100"></div>
      </section>
    </>
  );
};

export default Home;
