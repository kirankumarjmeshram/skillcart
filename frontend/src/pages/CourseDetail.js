import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Card, Accordion } from 'react-bootstrap';
import ProgressTracker from '../components/ProgressTracker';

const CourseDetail = () => {
  const { courseId } = useParams(); // Get the courseId from URL parameters
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);

  const learnerId = 'learner123';  // Replace with actual learner ID

  useEffect(() => {
    // Fetch course details based on courseId
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        setCourse(response.data);
        setTopics(response.data.topics);
      } catch (err) {
        console.error("Error fetching course details", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <Card>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text>{course.description}</Card.Text>
        </Card.Body>
      </Card>

      <ProgressTracker courseId={courseId} learnerId={learnerId} />

      <h3 className="mt-4">Course Topics</h3>
      <Accordion defaultActiveKey="0">
        {topics.map((topic, index) => (
          <Accordion.Item eventKey={index.toString()} key={topic._id}>
            <Accordion.Header>{`Topic ${index + 1}: ${topic.title}`}</Accordion.Header>
            <Accordion.Body>
              <p><strong>Videos:</strong> {topic.videos.join(', ')}</p>
              <p><strong>Blogs:</strong> {topic.blogs.join(', ')}</p>
              <p><strong>Notes:</strong> {topic.notes}</p>
              <Button variant="primary">Attempt Quiz</Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseDetail;
