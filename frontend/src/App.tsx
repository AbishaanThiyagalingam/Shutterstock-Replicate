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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserApp from "./user/App"; // User-specific App
import AdminApp from "./admin/app"; // Admin-specific App
import SellerApp from "./seller/App"; // Seller-specific App

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Seller Layout */}
        <Route path="/seller/*" element={<SellerApp />} />

        {/* User Layout */}
        <Route path="/*" element={<UserApp />} />
      </Routes>
    </Router>
  );
};

export default App;
