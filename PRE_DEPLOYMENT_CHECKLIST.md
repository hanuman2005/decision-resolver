# 🚀 Quick Start - Pre-Deployment Checklist

## Before You Deploy

### 1️⃣ **Seed Database** (Right Now!)

```bash
node seed.js
```

✅ Creates 5 test users, 3 groups, 3 decisions, history records

### 2️⃣ **Test with Sample Data** (Optional but recommended)

```bash
# Terminal 1: Start Backend
cd backend && npm run dev

# Terminal 2: Start Frontend
cd frontend && npm run dev

# Open http://localhost:5173
# Login with: john@example.com / Password123!
```

### 3️⃣ **Deploy to Vercel (Frontend)**

```
1. Go to https://vercel.com/new
2. Import: hanuman2005/decision-resolver
3. Set environment variables:
   VITE_API_URL=https://your-render-backend.onrender.com
4. Click Deploy
```

### 4️⃣ **Deploy to Render (Backend)**

```
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect: hanuman2005/decision-resolver
4. Set:
   - Build: cd backend && npm install
   - Start: cd backend && npm start
5. Environment Variables:
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<generate-strong-secret>
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
6. Click "Create Web Service"
```

### 5️⃣ **Update Backend CORS** (After Vercel deployment)

Edit `backend/server.js` line ~36:

```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://YOUR-VERCEL-DOMAIN.vercel.app", // ← Add your domain
];
```

Push changes:

```bash
git add .
git commit -m "chore: update CORS for production"
git push
```

---

## Test Users (After Seeding)

| Email             | Password     | Group                      |
| ----------------- | ------------ | -------------------------- |
| john@example.com  | Password123! | Friends Squad, Movie Night |
| jane@example.com  | Password123! | Work Team                  |
| mike@example.com  | Password123! | Movie Night                |
| sarah@example.com | Password123! | Work Team                  |
| david@example.com | Password123! | Work Team                  |

---

## Verification Checklist

After deployment, verify:

- [ ] Frontend loads at Vercel URL
- [ ] Can login with john@example.com / Password123!
- [ ] Dashboard shows stats
- [ ] Groups page shows 3 groups
- [ ] Analytics page shows charts
- [ ] AI Suggestions page works
- [ ] No console errors
- [ ] No CORS errors

---

## Help?

| Issue          | Solution                                         |
| -------------- | ------------------------------------------------ |
| Seeding fails  | Check `.env` MONGODB_URI                         |
| Can't login    | Verify user seeded (run `node seed.js`)          |
| API 404 errors | Check frontend VITE_API_URL environment variable |
| CORS errors    | Update Vercel domain in backend `server.js`      |

---

## Summary

✅ **You're 5 simple steps away from launch!**

1. `node seed.js` ← **Start here!**
2. Deploy frontend to Vercel
3. Deploy backend to Render
4. Update CORS in backend
5. Test with sample users

🎉 **Done! Your app is live!**
