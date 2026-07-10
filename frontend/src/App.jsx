import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/authentication/Login.jsx';
import Register from './pages/authentication/Register.jsx';
import { getcurrentUser } from './features/GetcurrentUser.js';

// A simple protected route component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getcurrentUser();
        setUser(currentUser); // Assuming getcurrentUser returns user data or null
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null); // Ensure user is null on error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute user={user}>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;