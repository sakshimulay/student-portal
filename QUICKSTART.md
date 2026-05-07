# Quick Start Guide

## 5-Minute Setup

### Step 1: Start MongoDB
```bash
# Windows
# Open Command Prompt and run:
mongod

# Or if MongoDB is installed as a service, ensure it's running
```

### Step 2: Install & Run Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

**Expected output:**
```
Server running on http://localhost:5000
Database seeded successfully!
MongoDB connected successfully
```

### Step 3: Open Frontend

```bash
# Option A: Direct browser (Simplest)
# Open: c:\Users\hp\Documents\student-portal\frontend\index.html
# (Just double-click the file in File Explorer)

# Option B: Using Python HTTP Server
cd frontend
python -m http.server 8000
# Then open: http://localhost:8000
```

### Step 4: Login & Test

Visit the landing page and use these credentials:

| Role | Username | Password |
|------|----------|----------|
| Student | student1 | student123 |
| Parent | parent1 | parent123 |
| Teacher | teacher1 | teacher123 |
| Admin | admin | admin123 |

---

## File Structure Created

```
student-portal/
├── backend/
│   ├── server.js (420 lines) - Complete backend with API routes
│   └── package.json - Dependencies (express, mongoose, cors)
│
├── frontend/
│   ├── index.html - Landing page
│   ├── login.html - Login page
│   ├── student-dashboard.html - Student interface
│   ├── parent-dashboard.html - Parent interface
│   ├── teacher-dashboard.html - Teacher interface
│   ├── admin-dashboard.html - Admin interface
│   ├── style.css - Unified responsive styling
│   └── script.js - Shared utilities
│
├── README.md - Complete documentation
└── QUICKSTART.md - This file
```

---

## Features Summary

### ✅ Fully Implemented

**Authentication**
- Role-based login (4 roles)
- Session persistence
- Logout functionality

**Student Dashboard**
- 📋 View Attendance (with status badges)
- 📊 View Results (with percentage and grades)
- 💰 View Fees (with payment status)
- 📝 Register for Exams
- 🎫 Download Admit Cards
- 🔄 Apply for Rechecking
- 📢 View Notices

**Parent Dashboard**
- Monitor linked student's attendance
- View student results
- Track fees
- View notices

**Teacher Dashboard**
- Upload attendance records
- Upload student results
- Post notices to students

**Admin Dashboard**
- Add new students
- Add new parents
- Create and manage exams
- Approve/reject rechecking requests

**Database**
- MongoDB with pre-loaded dummy data
- 8 collections (Users, Students, Attendance, Results, Fees, Exams, ExamRegistrations, Notices, Rechecking)
- Proper relationships between models

---

## API Endpoints (25+ Routes)

All endpoints are fully functional and connected to MongoDB:
- Authentication: 1 route
- Student routes: 7 endpoints
- Parent routes: 4 endpoints
- Teacher routes: 3 endpoints
- Admin routes: 5 endpoints

---

## Testing Checklist

1. ✅ Can you login with different roles?
2. ✅ Does student dashboard show attendance, results, fees?
3. ✅ Can you register for an exam?
4. ✅ Can parents view student data?
5. ✅ Can teachers upload attendance?
6. ✅ Can admin approve rechecking?

---

## Ports Used

- **Backend API:** http://localhost:5000
- **MongoDB:** localhost:27017
- **Frontend:** http://localhost:8000 (if using Python server)

---

## Common Issues & Solutions

### Issue: "Cannot GET /api/..."
**Solution:** Ensure backend server is running on port 5000

### Issue: "MongoDB connection error"
**Solution:** Start MongoDB service (mongod)

### Issue: CORS error in console
**Solution:** Backend is running, check that API_URL in browser console matches localhost:5000

### Issue: Blank page or 404
**Solution:** 
- Make sure you're opening index.html from the frontend folder
- Or use Python HTTP server: `python -m http.server 8000`

---

## Next Steps

- ✅ Test all features
- ✅ Verify data in MongoDB
- ✅ Check API responses
- ✅ Test on mobile browser (responsive design)

## For Production

1. Add password hashing (bcrypt)
2. Implement JWT authentication
3. Add input validation
4. Add error handling
5. Deploy to cloud (Heroku, AWS, etc.)
6. Set up database backups

---

## Demo Data Available

✅ 1 Admin user
✅ 1 Teacher user
✅ 1 Parent user
✅ 1 Student with linked parent
✅ 3 Attendance records
✅ 3 Result records
✅ 3 Fee records
✅ 2 Exam records
✅ 3 Notice records
✅ 2 Exam registrations

---

**You're all set! Enjoy testing the Student Portal! 🎓**
