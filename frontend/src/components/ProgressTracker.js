import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressBar, Button, Card } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';

const ProgressTracker = ({ courseId, learnerId }) => {
//   const { topicId } = useParams(); 
  const [progress, setProgress] = useState({});
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/roadmap/${learnerId}/${courseId}`);
        setProgress(res.data.progress);
        setXp(res.data.xp); // Assuming the response contains XP data
      } catch (err) {
        console.error("Error fetching progress", err);
      }
    };

    fetchProgress();
  }, [learnerId, courseId]);

  const handleProgressChange = async (topicId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/roadmap/${learnerId}/${courseId}`, {
        topicId,
        status: newStatus,
      });
      setProgress((prevProgress) => ({
        ...prevProgress,
        [topicId]: newStatus,
      }));
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };

  const totalTopics = Object.keys(progress).length;
  const completedTopics = Object.values(progress).filter((status) => status === 'Completed').length;
  const progressPercentage = totalTopics ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Course Progress</Card.Title>
        <ProgressBar now={progressPercentage} label={`${Math.round(progressPercentage)}%`} />
        <div className="mt-3">
          <h5>XP Earned: {xp}</h5>
        </div>
        <div className="mt-3">
          {Object.keys(progress).map((topicId) => (
            <div key={topicId} className="mb-2">
              <span>Topic {topicId} - </span>
              <Button
                variant={progress[topicId] === 'Completed' ? 'success' : 'warning'}
                onClick={() => handleProgressChange(topicId, 'Completed')}
              >
                Mark as Completed
              </Button>
              <Button
                variant={progress[topicId] === 'In Progress' ? 'info' : 'secondary'}
                onClick={() => handleProgressChange(topicId, 'In Progress')}
                className="ml-2"
              >
                Mark as In Progress
              </Button>
              <Button
                variant={progress[topicId] === 'Not Started' ? 'danger' : 'secondary'}
                onClick={() => handleProgressChange(topicId, 'Not Started')}
                className="ml-2"
              >
                Mark as Not Started
              </Button>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProgressTracker;
