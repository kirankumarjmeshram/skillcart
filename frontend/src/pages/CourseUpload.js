import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

const CourseUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([{}]);

  const handleTopicChange = (index, event) => {
    const newTopics = [...topics];
    newTopics[index][event.target.name] = event.target.value;
    setTopics(newTopics);
  };

  const addTopic = () => {
    setTopics([...topics, {}]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = { title, description, topics };
      await axios.post("http://localhost:5000/api/courses", courseData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Course uploaded successfully");
    } catch (err) {
      alert("Error uploading course");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h3>Upload a Course</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        {topics.map((topic, index) => (
          <div key={index} className="mb-3">
            <h5>Topic {index + 1}</h5>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={topic.title || ""} onChange={(e) => handleTopicChange(index, e)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Videos (comma separated)</Form.Label>
              <Form.Control type="text" name="videos" value={topic.videos || ""} onChange={(e) => handleTopicChange(index, e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blogs (comma separated)</Form.Label>
              <Form.Control type="text" name="blogs" value={topic.blogs || ""} onChange={(e) => handleTopicChange(index, e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control type="text" name="notes" value={topic.notes || ""} onChange={(e) => handleTopicChange(index, e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quiz (JSON format)</Form.Label>
              <Form.Control type="text" name="quiz" value={topic.quiz || ""} onChange={(e) => handleTopicChange(index, e)} />
            </Form.Group>
          </div>
        ))}
        <Button onClick={addTopic}>Add Topic</Button>
        <Button type="submit" className="mt-3">Submit</Button>
      </Form>
    </Container>
  );
};

export default CourseUpload;
