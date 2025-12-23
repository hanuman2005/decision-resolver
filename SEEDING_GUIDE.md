# Database Seeding Guide

Before deploying, insert sample data into MongoDB using this seeding script.

## Prerequisites

1. ✅ MongoDB Atlas account
2. ✅ Database created and connection string ready
3. ✅ Environment variables configured

## Step 1: Update `.env` file

Make sure your `backend/.env` file has:

```dotenv
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/group-decision-resolver
```

## Step 2: Run the Seeding Script

```bash
# From root directory
node seed.js
```

## What Gets Created

✅ **5 Sample Users**

- john@example.com
- jane@example.com
- mike@example.com
- sarah@example.com
- david@example.com

Password for all: `Password123!`

✅ **3 Sample Groups**

- Friends Squad
- Work Team
- Movie Night Crew

✅ **3 Sample Decisions**

- Where to eat (Completed)
- Which movie (Completed)
- Weekend activity (Collecting)

✅ **User History Records**

- Satisfaction scores
- Fairness metrics
- Decision history

## Step 3: Verify Data

After seeding completes, you should see:

```
✅ Database seeding completed!

📋 Summary:
   - Users: 5
   - Groups: 3
   - Decisions: 3
   - History Records: 2
```

## Step 4: Test the Application

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Login with any test user email and password `Password123!`
4. You should see:
   - Dashboard with stats
   - Groups with data
   - Decisions with constraints
   - Analytics with trends

## Troubleshooting

### ❌ "ECONNREFUSED" Error

- Check MongoDB connection string in `.env`
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0 for all IPs)

### ❌ "collection already exists" Error

- Script clears old data automatically
- If issue persists, manually delete collections in MongoDB Atlas

### ❌ "env file not found" Error

- Make sure `.env` exists in root or `backend/` directory
- Check `MONGODB_URI` is set correctly

## Custom Seeding

To add more data, edit `seed.js` and modify:

```javascript
// Add more users
const users = [
  // ... existing users
  {
    name: "Your Name",
    email: "your@email.com",
    password: await bcryptjs.hash("Password123!", 10),
    // ... more fields
  },
];
```

Then run: `node seed.js`

## Before Deployment

1. ✅ Run seeding script locally
2. ✅ Verify data in MongoDB Atlas
3. ✅ Test application with sample users
4. ✅ Check dashboard/analytics pages show data
5. ✅ Deploy to Vercel + Render

---

**Ready to seed?** Run: `node seed.js`
