import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Explore Courses</h2>
      <Row>
        {courses.map((course) => (
          <Col md={4} key={course._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button as={Link} to={`/courses/${course._id}`}>View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
