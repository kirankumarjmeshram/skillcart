import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CreatorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchProfileAndCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileRes = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data);

        const coursesRes = await axios.get("http://localhost:5000/api/courses/creator", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(coursesRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchProfileAndCourses();
  }, []);

  if (!profile) return <p>Loading dashboard...</p>;

  return (
    <Container className="mt-4">
      <h2>Welcome, {profile.name}!</h2>
      <Card className="p-3 my-3">
        <h5>Email: {profile.email}</h5>
        <p>Total XP: {profile.xp || 0}</p>
        <p>Badges: {profile.badges?.join(", ") || "None"}</p>
      </Card>

      <div className="d-flex justify-content-between align-items-center">
        <h4>Your Courses</h4>
        <Link to="/upload-course">
          <Button variant="success">Upload New Course</Button>
        </Link>
      </div>

      <Row>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Col key={course._id} md={4}>
              <CourseCard course={course} />
            </Col>
          ))
        ) : (
          <p>You haven't created any courses yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default CreatorDashboard;
