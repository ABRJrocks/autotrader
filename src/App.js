// src/App.js
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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
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
