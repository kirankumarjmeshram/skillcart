import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <Link to={`/course/${course._id}`}>
          <Button variant="primary">View Course</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
