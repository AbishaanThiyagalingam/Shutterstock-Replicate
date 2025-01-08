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
import UserApp from "./user/app"; // User-specific App
import AdminApp from "./admin/app"; // Admin-specific App

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* User Layout */}
        <Route path="/*" element={<UserApp />} />
      </Routes>
    </Router>
  );
};

export default App;

