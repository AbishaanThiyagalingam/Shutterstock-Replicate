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
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./user/components/Header/index";
import Footer from "./user/components/Footer/index";
import Home from "./user/pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
