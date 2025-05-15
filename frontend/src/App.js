import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CreatorDashboard from './pages/CreatorDashboard';
import LearnerDashboard from './pages/LearnerDashboard';
// import CreatorProfile from "./pages/CreatorProfile";
// import LearnerProfile from "./pages/LearnerProfile";
import ProfilePage from "./pages/ProfilePage";

import CourseUpload from "./pages/CourseUpload";
import CourseDetail from "./pages/CourseDetail";
import RoadmapPage from "./pages/RoadmapPage";
import QuizPage from "./pages/QuizPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const userRole = localStorage.getItem('role');

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Container className="flex-grow-1 mt-4">
          <Routes>

            {/* Redirect root to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard and Profile Route - dynamic based on role */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {userRole === "creator" ? <CreatorDashboard /> : <LearnerDashboard />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {/* {userRole === "creator" ? <CreatorProfile /> : <LearnerProfile />} */}
                  <ProfilePage/>
                </ProtectedRoute>
              }
            />

            {/* Creator-only course upload */}
            <Route
              path="/upload-course"
              element={
                <ProtectedRoute>
                  <CourseUpload />
                </ProtectedRoute>
              }
            />

            {/* Common learning routes */}
            <Route
              path="/course/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap/:courseId"
              element={
                <ProtectedRoute>
                  <RoadmapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:courseId/topic/:topicId/quiz"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
