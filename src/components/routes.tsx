import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import RecordingsPage from "./recordings/RecordingsPage";
import SchedulePage from "./schedule/SchedulePage";
import ReportsPage from "./reports/ReportsPage";
import LiveRecordingPage from "./recording/LiveRecordingPage";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={() => {}} />} />
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/recordings"
        element={
          <ProtectedRoute>
            <RecordingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/live"
        element={
          <ProtectedRoute>
            <LiveRecordingPage />
          </ProtectedRoute>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
