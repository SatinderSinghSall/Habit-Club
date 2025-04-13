import { Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import HabitDetails from "./pages/HabitDetails";
import FriendsPage from "./pages/FriendsPage";
import Footer from "./components/Footer";
import PageNotFoundRoute from "./components/PageNotFoundRoute";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<PageNotFoundRoute />} />

        {/* ✅ Protected Routes for Dashboard: */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/habit/:id"
          element={
            <ProtectedRoute>
              <HabitDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  );
}

export default App;
