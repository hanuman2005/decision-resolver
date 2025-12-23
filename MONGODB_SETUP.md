# MongoDB & Environment Setup Guide

## Get Your MongoDB URI

### Step 1: Go to MongoDB Atlas

https://www.mongodb.com/cloud/atlas

### Step 2: Create a Cluster (if you haven't)

1. Click "Create" → "Build a Cluster"
2. Choose FREE tier
3. Select your region
4. Click "Create Cluster"

### Step 3: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Drivers" → "Node.js"
3. Copy the connection string (looks like):

```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Step 4: Update Your `.env` File

**For Local Development** (`backend/.env`):

```dotenv
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/group-decision-resolver

JWT_SECRET=your_local_secret_key_can_be_anything
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:5173

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

DECISION_SESSION_EXPIRY=24
```

**For Production** (Render environment variables):

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/group-decision-resolver

JWT_SECRET=generate-strong-random-string-HERE
JWT_EXPIRE=7d

FRONTEND_URL=https://your-vercel-app.vercel.app

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

DECISION_SESSION_EXPIRY=24
```

---

## Generate Strong JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as `JWT_SECRET` in your environment variables.

---

## Important: Whitelist Your IP

In MongoDB Atlas:

1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

⚠️ **Note**: This allows any IP. For production, you should specify only Render's IP.

---

## Test Your Connection

After setting up `.env`, run:

```bash
cd backend
npm run dev
```

If you see:

```
✅ Server running in development mode on port 5000
✅ MongoDB Connected
```

You're ready to seed! → Run: `node seed.js`

---

## Troubleshooting

### ❌ "authentication failed"

- Check username and password in MongoDB URI
- Make sure special characters are URL encoded (e.g., @ becomes %40)

### ❌ "IP address not whitelisted"

- Go to MongoDB Atlas → Network Access
- Click "Allow Access from Anywhere"
- Wait 1-2 minutes for changes to apply

### ❌ "failed to connect"

- Verify MONGODB_URI is correct
- Check internet connection
- MongoDB cluster might be paused - go to Atlas and resume it

---

**Once `.env` is set up:**

```bash
node seed.js
```

This will populate your database with sample data! 🎉
