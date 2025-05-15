import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LearnerDashboard from './pages/LearnerDashboard';
import CreatorProfile from './pages/CreatorProfile';
import LearnerProfile from './pages/LearnerProfile';
import CourseUpload from './pages/CourseUpload';
import CourseDetail from './pages/CourseDetail';
import RoadmapPage from './pages/RoadmapPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route 
            path="/creator/dashboard" 
            element={<ProtectedRoute><CourseUpload /></ProtectedRoute>} 
          />
          <Route 
            path="/creator/profile" 
            element={<ProtectedRoute><CreatorProfile /></ProtectedRoute>} 
          />

          <Route 
            path="/learner/dashboard" 
            element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/learner/profile" 
            element={<ProtectedRoute><LearnerProfile /></ProtectedRoute>} 
          />
          <Route 
            path="/course/:courseId" 
            element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} 
          />
          <Route 
            path="/roadmap/:courseId" 
            element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
