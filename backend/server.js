const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/student_portal';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// ==================== SCHEMAS ====================

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['student', 'parent', 'teacher', 'admin'] },
  email: String,
  name: String,
  linkedStudentId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

// Student Schema
const studentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  rollNumber: String,
  grade: String,
  parentId: mongoose.Schema.Types.ObjectId,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  date: Date,
  status: { type: String, enum: ['present', 'absent', 'late'] },
  subject: String,
  uploadedBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

// Results Schema
const resultSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  subject: String,
  marks: Number,
  totalMarks: Number,
  percentage: Number,
  grade: String,
  uploadedBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

// Fees Schema
const feeSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  month: String,
  amount: Number,
  status: { type: String, enum: ['paid', 'pending'] },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now }
});

// Exam Schema
const examSchema = new mongoose.Schema({
  name: String,
  date: Date,
  subject: String,
  totalMarks: Number,
  duration: String,
  createdAt: { type: Date, default: Date.now }
});

// Exam Registration Schema
const examRegistrationSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  examId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['registered', 'cancelled'] },
  registeredAt: { type: Date, default: Date.now }
});

// Admit Card Schema
const admitCardSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  examId: mongoose.Schema.Types.ObjectId,
  rollNumber: String,
  examName: String,
  examDate: Date,
  downloadedAt: { type: Date, default: Date.now }
});

// Rechecking Schema
const recheckingSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  resultId: mongoose.Schema.Types.ObjectId,
  reason: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'] },
  appliedAt: { type: Date, default: Date.now },
  approvedBy: mongoose.Schema.Types.ObjectId,
  approvedAt: Date
});

// Notice Schema
const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: mongoose.Schema.Types.ObjectId,
  visibility: { type: String, enum: ['all', 'students', 'parents', 'teachers'] },
  createdAt: { type: Date, default: Date.now }
});

// Self-Service Request Schema
const requestSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  requestType: { type: String, enum: ['bonafide', 'transcript', 'id-card', 'other'] },
  description: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
  approvedBy: mongoose.Schema.Types.ObjectId,
  approvedAt: Date,
  rejectionReason: String
});

// Models
const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Result = mongoose.model('Result', resultSchema);
const Fee = mongoose.model('Fee', feeSchema);
const Exam = mongoose.model('Exam', examSchema);
const ExamRegistration = mongoose.model('ExamRegistration', examRegistrationSchema);
const AdmitCard = mongoose.model('AdmitCard', admitCardSchema);
const Rechecking = mongoose.model('Rechecking', recheckingSchema);
const Notice = mongoose.model('Notice', noticeSchema);
const Request = mongoose.model('Request', requestSchema);

// ==================== DUMMY DATA ====================

async function seedDatabase() {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has data, skipping seed');
      return;
    }

    // Create Admin User
    const admin = await User.create({
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      email: 'admin@portal.com',
      name: 'Admin User'
    });

    // Create Teacher User
    const teacher = await User.create({
      username: 'teacher1',
      password: 'teacher123',
      role: 'teacher',
      email: 'teacher@portal.com',
      name: 'Mr. John Teacher'
    });

    // Create Parent User
    const parent = await User.create({
      username: 'parent1',
      password: 'parent123',
      role: 'parent',
      email: 'parent@portal.com',
      name: 'Mrs. Parent'
    });

    // Create Student User
    const student = await User.create({
      username: 'student1',
      password: 'student123',
      role: 'student',
      email: 'student@portal.com',
      name: 'John Student',
      linkedStudentId: null
    });

    // Create Student Record
    const studentRecord = await Student.create({
      userId: student._id,
      rollNumber: 'STU001',
      grade: '10-A',
      parentId: parent._id,
      email: 'student@portal.com',
      phone: '9876543210'
    });

    // Update student linkedStudentId
    await User.findByIdAndUpdate(student._id, { linkedStudentId: studentRecord._id });

    // Update parent linkedStudentId
    await User.findByIdAndUpdate(parent._id, { linkedStudentId: studentRecord._id });

    // Create Attendance Records
    await Attendance.create([
      {
        studentId: studentRecord._id,
        date: new Date('2024-04-20'),
        status: 'present',
        subject: 'Mathematics',
        uploadedBy: teacher._id
      },
      {
        studentId: studentRecord._id,
        date: new Date('2024-04-21'),
        status: 'present',
        subject: 'English',
        uploadedBy: teacher._id
      },
      {
        studentId: studentRecord._id,
        date: new Date('2024-04-22'),
        status: 'absent',
        subject: 'Science',
        uploadedBy: teacher._id
      }
    ]);

    // Create Results
    await Result.create([
      {
        studentId: studentRecord._id,
        subject: 'Mathematics',
        marks: 92,
        totalMarks: 100,
        percentage: 92,
        grade: 'A+',
        uploadedBy: teacher._id
      },
      {
        studentId: studentRecord._id,
        subject: 'English',
        marks: 85,
        totalMarks: 100,
        percentage: 85,
        grade: 'A',
        uploadedBy: teacher._id
      },
      {
        studentId: studentRecord._id,
        subject: 'Science',
        marks: 88,
        totalMarks: 100,
        percentage: 88,
        grade: 'A',
        uploadedBy: teacher._id
      }
    ]);

    // Create Fees
    await Fee.create([
      {
        studentId: studentRecord._id,
        month: 'January 2024',
        amount: 5000,
        status: 'paid',
        dueDate: new Date('2024-01-31')
      },
      {
        studentId: studentRecord._id,
        month: 'February 2024',
        amount: 5000,
        status: 'paid',
        dueDate: new Date('2024-02-29')
      },
      {
        studentId: studentRecord._id,
        month: 'March 2024',
        amount: 5000,
        status: 'pending',
        dueDate: new Date('2024-03-31')
      }
    ]);

    // Create Exams
    const exam1 = await Exam.create({
      name: 'Mid Term Exam',
      date: new Date('2024-05-15'),
      subject: 'Mathematics',
      totalMarks: 100,
      duration: '2 hours'
    });

    const exam2 = await Exam.create({
      name: 'Final Exam',
      date: new Date('2024-06-10'),
      subject: 'English',
      totalMarks: 100,
      duration: '2.5 hours'
    });

    // Create Exam Registrations
    await ExamRegistration.create([
      {
        studentId: studentRecord._id,
        examId: exam1._id,
        status: 'registered'
      },
      {
        studentId: studentRecord._id,
        examId: exam2._id,
        status: 'registered'
      }
    ]);

    // Create Notices
    await Notice.create([
      {
        title: 'School Holiday Announcement',
        content: 'School will be closed on May 1st for Labour Day',
        createdBy: admin._id,
        visibility: 'all'
      },
      {
        title: 'Exam Schedule',
        content: 'Mid-term exams will be held from May 15-20, 2024',
        createdBy: teacher._id,
        visibility: 'students'
      },
      {
        title: 'Fee Payment Reminder',
        content: 'Please pay your fees before the due date',
        createdBy: admin._id,
        visibility: 'parents'
      }
    ]);

    // Create Self-Service Requests
    await Request.create([
      {
        studentId: studentRecord._id,
        requestType: 'bonafide',
        description: 'Need Bonafide Certificate for scholarship application',
        status: 'pending'
      },
      {
        studentId: studentRecord._id,
        requestType: 'transcript',
        description: 'Required for university admission',
        status: 'approved',
        approvedBy: admin._id,
        approvedAt: new Date()
      }
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// ==================== API ROUTES ====================

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        linkedStudentId: user.linkedStudentId
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STUDENT ROUTES ====================

// View Attendance
app.get('/api/student/:studentId/attendance', async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.studentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Results
app.get('/api/student/:studentId/results', async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.params.studentId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Fees
app.get('/api/student/:studentId/fees', async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Available Exams
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register for Exam
app.post('/api/student/:studentId/register-exam', async (req, res) => {
  try {
    const { examId } = req.body;
    const registration = await ExamRegistration.create({
      studentId: req.params.studentId,
      examId: examId,
      status: 'registered'
    });
    res.json({ success: true, message: 'Exam registered successfully', registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Admit Cards
app.get('/api/student/:studentId/admit-cards', async (req, res) => {
  try {
    const admitCards = await AdmitCard.find({ studentId: req.params.studentId });
    res.json(admitCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download Admit Card
app.post('/api/student/:studentId/download-admit-card', async (req, res) => {
  try {
    const { examId } = req.body;
    const student = await Student.findById(req.params.studentId);
    const exam = await Exam.findById(examId);

    const admitCard = await AdmitCard.create({
      studentId: req.params.studentId,
      examId: examId,
      rollNumber: student.rollNumber,
      examName: exam.name,
      examDate: exam.date
    });

    res.json({
      success: true,
      message: 'Admit card generated',
      admitCard: {
        rollNumber: admitCard.rollNumber,
        examName: admitCard.examName,
        examDate: admitCard.examDate
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply for Rechecking
app.post('/api/student/:studentId/apply-rechecking', async (req, res) => {
  try {
    const { resultId, reason } = req.body;
    const rechecking = await Rechecking.create({
      studentId: req.params.studentId,
      resultId: resultId,
      reason: reason,
      status: 'pending'
    });
    res.json({ success: true, message: 'Rechecking request submitted', rechecking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Rechecking Status
app.get('/api/student/:studentId/rechecking', async (req, res) => {
  try {
    const rechecking = await Rechecking.find({ studentId: req.params.studentId });
    res.json(rechecking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find({ visibility: { $in: ['all', 'students'] } });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PARENT ROUTES ====================

// View Linked Student Attendance
app.get('/api/parent/:parentId/student-attendance', async (req, res) => {
  try {
    const parent = await User.findById(req.params.parentId);
    const attendance = await Attendance.find({ studentId: parent.linkedStudentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Linked Student Results
app.get('/api/parent/:parentId/student-results', async (req, res) => {
  try {
    const parent = await User.findById(req.params.parentId);
    const results = await Result.find({ studentId: parent.linkedStudentId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Linked Student Fees
app.get('/api/parent/:parentId/student-fees', async (req, res) => {
  try {
    const parent = await User.findById(req.params.parentId);
    const fees = await Fee.find({ studentId: parent.linkedStudentId });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Notices for Parents
app.get('/api/parent/notices', async (req, res) => {
  try {
    const notices = await Notice.find({ visibility: { $in: ['all', 'parents'] } });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== TEACHER ROUTES ====================

// Upload Attendance
app.post('/api/teacher/upload-attendance', async (req, res) => {
  try {
    const { studentId, date, status, subject, uploadedBy } = req.body;
    const attendance = await Attendance.create({
      studentId,
      date,
      status,
      subject,
      uploadedBy
    });
    res.json({ success: true, message: 'Attendance uploaded', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload Results
app.post('/api/teacher/upload-results', async (req, res) => {
  try {
    const { studentId, subject, marks, totalMarks, grade, uploadedBy } = req.body;
    const percentage = (marks / totalMarks) * 100;
    const result = await Result.create({
      studentId,
      subject,
      marks,
      totalMarks,
      percentage,
      grade,
      uploadedBy
    });
    res.json({ success: true, message: 'Results uploaded', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post Notice
app.post('/api/teacher/post-notice', async (req, res) => {
  try {
    const { title, content, createdBy, visibility } = req.body;
    const notice = await Notice.create({
      title,
      content,
      createdBy,
      visibility
    });
    res.json({ success: true, message: 'Notice posted', notice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STUDENT REQUEST ROUTES ====================

// Create Self-Service Request
app.post('/api/student/:studentId/create-request', async (req, res) => {
  try {
    const { requestType, description } = req.body;
    const request = await Request.create({
      studentId: req.params.studentId,
      requestType,
      description,
      status: 'pending'
    });
    res.json({ success: true, message: 'Request submitted successfully', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Student's Requests
app.get('/api/student/:studentId/requests', async (req, res) => {
  try {
    const requests = await Request.find({ studentId: req.params.studentId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ADMIN ROUTES ====================

// Add Student
app.post('/api/admin/add-student', async (req, res) => {
  try {
    const { username, password, email, name, rollNumber, grade, parentId, phone } = req.body;

    const user = await User.create({
      username,
      password,
      role: 'student',
      email,
      name
    });

    const student = await Student.create({
      userId: user._id,
      rollNumber,
      grade,
      parentId,
      email,
      phone
    });

    await User.findByIdAndUpdate(user._id, { linkedStudentId: student._id });

    res.json({ success: true, message: 'Student added successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Parent
app.post('/api/admin/add-parent', async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    const user = await User.create({
      username,
      password,
      role: 'parent',
      email,
      name
    });

    res.json({ success: true, message: 'Parent added successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manage Exams - Create Exam
app.post('/api/admin/create-exam', async (req, res) => {
  try {
    const { name, date, subject, totalMarks, duration } = req.body;
    const exam = await Exam.create({
      name,
      date,
      subject,
      totalMarks,
      duration
    });
    res.json({ success: true, message: 'Exam created successfully', exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve Rechecking
app.post('/api/admin/approve-rechecking', async (req, res) => {
  try {
    const { recheckingId, approvedBy, status } = req.body;
    const rechecking = await Rechecking.findByIdAndUpdate(
      recheckingId,
      { status, approvedBy, approvedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, message: 'Rechecking updated', rechecking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Rechecking Requests
app.get('/api/admin/rechecking-requests', async (req, res) => {
  try {
    const requests = await Rechecking.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Self-Service Requests
app.get('/api/admin/all-requests', async (req, res) => {
  try {
    const requests = await Request.find().populate('studentId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve Self-Service Request
app.post('/api/admin/approve-request', async (req, res) => {
  try {
    const { requestId, approvedBy } = req.body;
    const request = await Request.findByIdAndUpdate(
      requestId,
      { status: 'approved', approvedBy, approvedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, message: 'Request approved successfully', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject Self-Service Request
app.post('/api/admin/reject-request', async (req, res) => {
  try {
    const { requestId, rejectionReason, approvedBy } = req.body;
    const request = await Request.findByIdAndUpdate(
      requestId,
      { status: 'rejected', rejectionReason, approvedBy },
      { new: true }
    );
    res.json({ success: true, message: 'Request rejected', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SERVER START ====================

const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await seedDatabase();
});
