// Home.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal/Modal";
import TwoStepUploadModal from "../components/Forms/UploadImageForm";
import bgImage from "../../images/seller-home-page-background.jpg";

const Home: React.FC = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsImageModalOpen(true);
  };

  return (
    <>
      <section
        id="home"
        className="dark:bg-[#FFFFFF] relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat pb-48 pt-[240px] md:pb-[140px] md:pt-[180px] xl:pb-[200px] xl:pt-[220px] 2xl:pb-[240px] 2xl:pt-[260px]"
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
                <h2 className="mb-4 text-xl font-medium text-gray-500">
                  Sell Your Stock Photos & Videos For Your Money
                </h2>
                <h1 className="mb-5 text-4xl font-extrabold leading-tight text-black sm:text-5xl md:text-6xl">
                  UPLOAD YOUR <br /> BEST CLICKS
                </h1>
                {/* Upload Button Section */}
                <div
                  className="flex items-center space-x-2 mt-8 cursor-pointer group border border-black/50 rounded-[20px] py-3 px-6 hover:border-black transition w-fit"
                  onClick={handleOpenModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-500 group-hover:text-black transition"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5V21h5.5M21 16.5V21h-5.5M12 3v13m0-13l-4 4m4-4l4 4"
                    />
                  </svg>
                  <p className="text-lg font-medium text-gray-500 group-hover:text-black transition">
                    Click Here to Upload
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100"></div>
      </section>

      {/* Images Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      >
        <TwoStepUploadModal onClose={() => setIsImageModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Home;
