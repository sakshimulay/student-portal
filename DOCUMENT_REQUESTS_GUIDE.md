# Self-Service Document Request Module - Implementation Guide

## ✅ What Was Added

A complete **Self-Service Document Request Module** has been integrated into your Student Portal. Students can now apply for various documents and admins can approve/reject requests.

---

## 📄 Document Types Available

Students can request:
1. **Bonafide Certificate** - For scholarships, admissions, etc.
2. **Transcript** - Academic records and marks
3. **ID Card** - Student identification
4. **Other Documents** - Custom requests with description

---

## 🎯 Features Implemented

### Backend (server.js)
✅ **New Schema**: Request collection with fields:
- `studentId` - Reference to student
- `requestType` - Type of document (bonafide, transcript, id-card, other)
- `description` - Purpose/reason for request
- `status` - pending/approved/rejected
- `appliedAt` - Application date
- `approvedBy` - Admin who approved
- `approvedAt` - Approval date
- `rejectionReason` - Reason if rejected

✅ **5 New API Routes**:
- `POST /api/student/:studentId/create-request` - Create new request
- `GET /api/student/:studentId/requests` - View own requests
- `GET /api/admin/all-requests` - View all requests (admin only)
- `POST /api/admin/approve-request` - Approve request (admin only)
- `POST /api/admin/reject-request` - Reject request (admin only)

✅ **Sample Data**: 2 demo requests already seeded

### Frontend - Student Dashboard
✅ **New Section**: "📄 Document Requests" 
- Form to submit new document requests
- Table showing all student's requests with status
- Status badges (pending/approved/rejected)

### Frontend - Admin Dashboard
✅ **New Section**: "📄 Manage Requests"
- Table showing all student document requests
- Approve/Reject buttons for pending requests
- Reason prompt for rejections
- Auto-refresh after action

---

## 🚀 How to Use

### For Students:
1. Login as a student
2. Click **"📄 Document Requests"** in sidebar
3. Fill the form:
   - Select document type
   - Add purpose/description
4. Click **"Submit Request"**
5. View status in the requests table below

### For Admin:
1. Login as admin
2. Click **"📄 Manage Requests"** in sidebar
3. View all pending student requests
4. Click **"Approve"** to approve or **"Reject"** to reject
5. If rejecting, enter reason
6. Request status updates automatically

---

## 📊 Database Collection Structure

```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  requestType: 'bonafide' | 'transcript' | 'id-card' | 'other',
  description: 'Purpose of the request',
  status: 'pending' | 'approved' | 'rejected',
  appliedAt: Date,
  approvedBy: ObjectId,
  approvedAt: Date,
  rejectionReason: 'Reason if rejected'
}
```

---

## 🧪 Testing the Feature

### Test Case 1: Student Submits Request
```
1. Login as student1 / student123
2. Go to "Document Requests" tab
3. Select "Bonafide Certificate"
4. Enter purpose: "For college admission"
5. Click Submit
✅ Request should appear in your requests table with "pending" status
```

### Test Case 2: Admin Approves Request
```
1. Login as admin / admin123
2. Go to "Manage Requests" tab
3. View pending requests
4. Click Approve button
✅ Request status should change to "approved"
```

### Test Case 3: Admin Rejects Request
```
1. Login as admin / admin123
2. Go to "Manage Requests" tab
3. Click Reject button
4. Enter reason: "Incomplete information"
✅ Request status should change to "rejected"
```

---

## 📝 API Endpoint Details

### Create Request (Student)
```javascript
POST /api/student/:studentId/create-request
{
  "requestType": "bonafide",
  "description": "For scholarship application"
}
Response: { success: true, message: "...", request: {...} }
```

### Get Student's Requests
```javascript
GET /api/student/:studentId/requests
Response: [{ _id, studentId, requestType, status, appliedAt, ... }, ...]
```

### Get All Requests (Admin)
```javascript
GET /api/admin/all-requests
Response: [{ _id, studentId, requestType, status, ... }, ...]
```

### Approve Request (Admin)
```javascript
POST /api/admin/approve-request
{
  "requestId": "...",
  "approvedBy": "adminId"
}
Response: { success: true, request: {...} }
```

### Reject Request (Admin)
```javascript
POST /api/admin/reject-request
{
  "requestId": "...",
  "rejectionReason": "Invalid documents",
  "approvedBy": "adminId"
}
Response: { success: true, request: {...} }
```

---

## 🎨 UI Components Added

### Student Dashboard
- **Navigation Button**: "📄 Document Requests" 
- **Form**: Dropdown for document type + textarea for description
- **Table**: Shows requests with columns (Document Type, Status, Applied Date, Approved Date)

### Admin Dashboard
- **Navigation Button**: "📄 Manage Requests"
- **Table**: Shows all requests with (Student ID, Document Type, Purpose, Status, Applied Date, Action buttons)
- **Action Buttons**: Approve/Reject (only visible for pending requests)

---

## 🔄 Status Flow

```
REQUEST WORKFLOW:
┌─────────────┐
│   PENDING   │ ← Initial status when student applies
└──────┬──────┘
       │
       ├─→ Admin clicks "Approve" → APPROVED ✅
       │
       └─→ Admin clicks "Reject" → REJECTED ❌
```

---

## ✨ Key Features

✅ **Student-Friendly**: Simple form to request documents
✅ **Admin Control**: Full approval/rejection workflow
✅ **Status Tracking**: Students see real-time status updates
✅ **Audit Trail**: Approval dates and admin info stored
✅ **Error Handling**: Proper error messages
✅ **Responsive Design**: Works on mobile and desktop
✅ **Color-Coded Status**: Visual indicators (pending/approved/rejected)

---

## 📁 Files Modified

1. **backend/server.js**
   - Added Request schema
   - Added Request model
   - Added 5 new API routes
   - Added sample request data

2. **frontend/student-dashboard.html**
   - Added Document Requests section to sidebar
   - Added request form and table UI
   - Added loadRequests() and submitRequest() functions

3. **frontend/admin-dashboard.html**
   - Added Manage Requests section to sidebar
   - Added requests management table
   - Added loadManageRequests(), approveRequest(), rejectRequest() functions

4. **frontend/style.css**
   - Added status-text styling

---

## 🚀 No Additional Setup Required!

The module is **fully integrated** and working with your existing project:
- ✅ No new dependencies needed
- ✅ MongoDB collection auto-created
- ✅ API endpoints ready to use
- ✅ UI already styled and responsive

**Just restart the backend and you're ready to go!**

```bash
npm start
```

---

## 💡 Future Enhancements

- [ ] Email notifications when status changes
- [ ] Document upload and attachment
- [ ] Expiration date for documents
- [ ] Download certificate as PDF
- [ ] Bulk operations for admin
- [ ] Activity history/logs
- [ ] SMS notifications to students

---

## 🆘 Troubleshooting

### "Request not submitting"
✅ Ensure backend is running on port 5000
✅ Check browser console for errors
✅ Verify MongoDB is connected

### "Admin can't see requests"
✅ Make sure you're logged in as admin
✅ Check that requests are created first (as student)
✅ Hard refresh the page (Ctrl+F5)

### "Approve button not working"
✅ Database connection may have issues
✅ Check server logs for error messages
✅ Restart both backend and MongoDB

---

**Feature Ready! 🎉**

Your Student Portal now has a complete document request management system!
