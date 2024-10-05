import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Dashboard/Dashboard";
import Settings from "./components/Dashboard/Settings";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import TBotLogo from "./TBotLogo";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [isMobile, setIsMobile] = useState(false); // Mobile device detection

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Detect if the user is on a mobile device based on screen width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Set breakpoint for mobile
    };

    checkIsMobile(); // Check on load

    // Listen for window resize to handle mobile resize behavior
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <TBotLogo />
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Show message if on a mobile device
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <TBotLogo />
        <p className="text-2xl font-bold mt-4">
          Please open the app on a desktop browser.
        </p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* If user is logged in, redirect login to home */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />
        {/* Protect the home route */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/login" />}
        />
        {/* Default route */}
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
