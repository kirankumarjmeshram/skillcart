const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  weeks: Number,
  weekWisePlan: [
    {
      week: Number,
      topics: [mongoose.Schema.Types.ObjectId],
    },
  ],
  progress: Object,
});

module.exports = mongoose.model('Roadmap', roadmapSchema);