
# 🎓 SkillKart

SkillKart is a full-stack MERN (MongoDB, Express, React, Node.js) application that empowers content creators to build skill-based learning roadmaps and allows learners to personalize their learning experience by selecting a custom weekly timeline. Learners unlock content sequentially, track their progress, and earn XP and badges for motivation.

---

## 🌟 Features

### 👨‍🎓 Learner Features

- Enroll in skill-based courses
- Choose a custom number of weeks to complete the course
- Weekly roadmap generated automatically
- Step-by-step content: Video → Blog → Notes → Quiz
- Quizzes must be passed to progress
- Earn XP and badges
- View progress per topic and per course

### 🎨 Creator Features

- Upload and manage courses
- Add topics with:
  - YouTube videos
  - Blog links
  - Text notes
  - Quizzes (MCQs)
- Edit or delete topics and quizzes
- View enrolled learners

---

## 🛠️ Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | React, React-Bootstrap                      |
| Backend    | Express, Node.js                            |
| Database   | MongoDB with Mongoose                       |
| Auth       | JWT (optional)                              |
| Deployment | Render (Backend), Netlify/Vercel (Frontend) |

---

## 📁 Folder Structure

skillkart/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ └── index.js
│
└── README.md

yaml
Copy
Edit

---

## 🔧 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skillkart.git
cd skillkart
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create .env file inside /backend:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection
PORT=5000
Start backend server:

bash
Copy
Edit
npm run dev
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
Visit: http://localhost:3000

🌍 Deployment
Backend on Render
Set up a new Web Service

Environment:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection
Don’t manually set PORT; Render will inject it automatically via process.env.PORT

Frontend on Vercel/Netlify
Update API base URL to point to your deployed backend (e.g., https://your-api.onrender.com)

Deploy via Git integration

📦 API Overview
Endpoint	Description
GET /api/courses	List all courses
GET /api/courses/:id	Get course by ID
POST /api/courses	Create a course
PUT /api/courses/:id	Update a course
GET /api/users/profile	Get learner/creator

🚧 Roadmap
 MVP functionality

 Dynamic weekly roadmap

 XP and badge logic

 Quiz and unlock logic

 Leaderboard and streaks

 Creator analytics

 Mobile responsive UI

🤝 Contribution
Pull requests are welcome!
Open an issue or feature request first to discuss what you’d like to change.
```
