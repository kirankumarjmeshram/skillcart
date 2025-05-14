const Roadmap = require('../models/Roadmap');
const Course = require('../models/Course');

exports.generateRoadmap = async (req, res) => {
  const { courseId, weeks } = req.body;
  try {
    const course = await Course.findById(courseId);
    const topics = course.topics.sort((a, b) => a.order - b.order);
    const perWeek = Math.floor(topics.length / weeks);
    const roadmap = [];
    let i = 0;
    for (let w = 1; w <= weeks; w++) {
      const count = w === weeks ? topics.length - i : perWeek;
      roadmap.push({ week: w, topics: topics.slice(i, i + count).map(t => t._id) });
      i += count;
    }
    const newRoadmap = await Roadmap.create({
      learnerId: req.user.userId,
      courseId,
      weeks,
      weekWisePlan: roadmap,
      progress: {},
    });
    res.status(201).json(newRoadmap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ learnerId: req.user.userId, courseId: req.params.courseId });
    res.json(roadmap);
  } catch (err) {
    res.status(404).json({ error: 'Roadmap not found' });
  }
};