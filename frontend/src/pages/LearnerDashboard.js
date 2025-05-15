import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressTracker from '../components/ProgressTracker';
import { Card, Button, Row, Col } from 'react-bootstrap';

const LearnerDashboard = () => {
  const [courses, setCourses] = useState([]);
  const learnerId = 'learner123';  // Replace with actual learner ID
  
  useEffect(() => {
    // Fetch the courses the learner is enrolled in
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/learner/courses/${learnerId}`);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, [learnerId]);

  return (
    <div>
      <h2>Your Dashboard</h2>
      <Row>
        {courses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          courses.map((course) => (
            <Col key={course._id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Button href={`/course/${course._id}`} variant="primary">Go to Course</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <ProgressTracker/>
    </div>
  );
};

export default LearnerDashboard;
