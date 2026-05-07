# Student Self-Service Portal

A complete full-stack web application for managing student information with role-based access control (Student, Parent, Teacher, Admin).

## Project Structure

```
student-portal/
├── backend/
│   ├── server.js          # Express server with MongoDB setup and API routes
│   └── package.json       # Backend dependencies
└── frontend/
    ├── index.html         # Landing page
    ├── login.html         # Login page
    ├── student-dashboard.html   # Student interface
    ├── parent-dashboard.html    # Parent interface
    ├── teacher-dashboard.html   # Teacher interface
    ├── admin-dashboard.html     # Admin interface
    ├── style.css          # Unified styling
    └── script.js          # Shared JavaScript utilities
```

## Features

### Student Features
- View Attendance
- View Results
- View Fees
- Register for Exam
- Download Admit Card
- Apply for Rechecking
- View Notices

### Parent Features
- View linked student's Attendance
- View Results
- View Fees
- View Notices

### Teacher Features
- Upload Attendance
- Upload Results
- Post Notices

### Admin Features
- Add Students
- Add Parents
- Manage Exams
- Approve Rechecking

## Technical Stack

**Frontend:**
- HTML5
- CSS3 (Responsive Design)
- JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Running on localhost:27017)
- npm or yarn

## Installation & Setup

### 1. Install MongoDB

Download and install MongoDB from: https://www.mongodb.com/try/download/community

Ensure MongoDB is running on `localhost:27017`

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will run on: `http://localhost:5000`

The database will be automatically seeded with sample data on first run.

### 3. Frontend Setup

Open the frontend files in a web browser:

```bash
cd frontend

# Option 1: Open directly in browser
# Open index.html in your web browser

# Option 2: Use a simple HTTP server (Python)
python -m http.server 8000

# Then visit: http://localhost:8000
```

## Demo Credentials

### Student
- **Username:** student1
- **Password:** student123

### Teacher
- **Username:** teacher1
- **Password:** teacher123

### Parent
- **Username:** parent1
- **Password:** parent123

### Admin
- **Username:** admin
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /api/login` - User login

### Student Routes
- `GET /api/student/:studentId/attendance` - View attendance
- `GET /api/student/:studentId/results` - View results
- `GET /api/student/:studentId/fees` - View fees
- `GET /api/exams` - Get available exams
- `POST /api/student/:studentId/register-exam` - Register for exam
- `GET /api/student/:studentId/admit-cards` - Get admit cards
- `POST /api/student/:studentId/download-admit-card` - Generate admit card
- `POST /api/student/:studentId/apply-rechecking` - Apply for rechecking
- `GET /api/student/:studentId/rechecking` - Get rechecking status
- `GET /api/notices` - Get notices

### Parent Routes
- `GET /api/parent/:parentId/student-attendance` - View student attendance
- `GET /api/parent/:parentId/student-results` - View student results
- `GET /api/parent/:parentId/student-fees` - View student fees
- `GET /api/parent/notices` - Get notices for parents

### Teacher Routes
- `POST /api/teacher/upload-attendance` - Upload attendance
- `POST /api/teacher/upload-results` - Upload results
- `POST /api/teacher/post-notice` - Post notice
- `GET /api/students` - Get all students

### Admin Routes
- `POST /api/admin/add-student` - Add student
- `POST /api/admin/add-parent` - Add parent
- `POST /api/admin/create-exam` - Create exam
- `GET /api/admin/rechecking-requests` - Get rechecking requests
- `POST /api/admin/approve-rechecking` - Approve/reject rechecking

## Database Schema

### Users
- username, password, role, email, name, linkedStudentId

### Students
- userId, rollNumber, grade, parentId, email, phone

### Attendance
- studentId, date, status, subject, uploadedBy

### Results
- studentId, subject, marks, totalMarks, percentage, grade, uploadedBy

### Fees
- studentId, month, amount, status, dueDate

### Exams
- name, date, subject, totalMarks, duration

### Notices
- title, content, createdBy, visibility

## Usage

1. **Start MongoDB** - Ensure MongoDB service is running
2. **Start Backend** - Run `npm start` in the backend folder
3. **Open Frontend** - Open `index.html` in a web browser
4. **Login** - Use demo credentials to test different roles
5. **Explore** - Navigate through different features based on your role

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Notes

- This is a demo application with basic authentication (plain text passwords)
- For production use, implement password hashing and JWT tokens
- Add input validation and error handling as needed
- Consider adding email notifications and real file uploads
- Implement proper access control and authorization

## Troubleshooting

### Backend not connecting
- Ensure MongoDB is running
- Check if port 5000 is available
- Check console for error messages

### Frontend can't connect to API
- Ensure backend server is running on port 5000
- Check browser console for CORS errors
- Verify API_URL in script.js matches backend URL

### Database seed not working
- Check MongoDB connection
- Ensure you have write permissions to the database
- Check server logs for detailed errors

## License

MIT License

## Support

For issues or questions, please check the console logs and ensure all services are running properly.
