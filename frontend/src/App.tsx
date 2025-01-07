// import React from "react";

// export default function App() {
//     return (
//         <div className="text-2xl text-blue-600">
//             Hello welcome!
//         </div>
//     );
// };

// App.tsx
import React from "react";
import Header from "./user/components/Header";
import Footer from "./user/components/Footer";
import Home from "./user/pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
