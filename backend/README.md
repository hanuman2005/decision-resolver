# 🤖 Group Decision Resolver - Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-6.0+-green)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/express-4.x-blue)](https://expressjs.com/)

> **🏆 National Level Hackathon Project**  
> Intelligent REST API for group decision-making using constraint satisfaction, AI, and fairness algorithms

[🚀 Live API](#) | [📖 API Documentation](#) | [💻 Frontend Repository](#)

---

## 🌟 Project Overview

**Group Decision Resolver Backend** is a sophisticated REST API that solves the critical problem:

### **How can groups make fair, satisfying decisions together?**

The backend implements advanced algorithms:
- 🎯 **Constraint Satisfaction** - Multi-criteria decision making
- 🤝 **Fairness Tracking** - Prevents dominance, ensures equity
- 🤖 **AI Integration** - OpenAI for smart suggestions
- 🔒 **Security** - JWT auth, rate limiting, encryption
- ⚡ **Real-time** - Socket.io for live updates
- 📊 **Analytics** - Decision patterns and insights

---

## 🎯 The Problem

Groups struggle with decisions:
- ⏰ **2+ hours** wasted on debates
- 😤 **Unfair outcomes** - loudest voice wins
- 🤷 **No accountability** - random choices
- 📉 **Low satisfaction** - someone always loses

## 💡 Our Solution

**Intelligent decision engine** that:
- ⚡ **Processes in <2 seconds** - Fast algorithm
- 🤝 **100% fair** - Historical tracking
- 🔍 **Transparent** - Explainable reasoning
- 📊 **Data-driven** - Analytics and insights

---

## 🏗️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Node.js 18+ | JavaScript runtime |
| **Framework** | Express.js 4.x | Web application framework |
| **Database** | MongoDB 6.0+ | NoSQL database |
| **ODM** | Mongoose 7.x | MongoDB object modeling |
| **Authentication** | JWT + Bcrypt | Secure auth system |
| **Real-time** | Socket.io 4.x | WebSocket communication |
| **AI** | OpenAI API | GPT-4 integration |
| **Validation** | Joi | Request validation |
| **Logging** | Winston | Structured logging |
| **Security** | Helmet, CORS | Security headers |
| **Email** | Nodemailer | SMTP email service |

---

## ✨ Complete API Features

### 🔐 **Authentication System**

**Features:**
- User registration with email validation
- Secure JWT-based authentication
- Password hashing with Bcrypt (10 salt rounds)
- Profile management
- Password change functionality
- Account deactivation
- Token refresh mechanism

**Security Measures:**
- JWT tokens expire in 7 days
- Passwords hashed with salt
- Rate limiting (100 requests per 15 min)
- Helmet security headers
- CORS configured properly

---

### 👥 **Group Management**

**Complete Lifecycle:**
- Create groups with descriptions
- Generate unique 6-character invite codes
- Join groups using codes
- Role-based access control (Admin/Member)
- Member promotion/demotion
- Member removal (admin only)
- Leave group functionality
- Delete group (creator only)

**Business Logic:**
- Prevent duplicate invites
- Validate member permissions
- Handle concurrent requests
- Maintain member count integrity

---

### ⚖️ **Decision Engine**

**Core Algorithm:**
```
Score(option) = Σ [UserScore(user, option) × FairnessMultiplier(user)] / MaxPossible

UserScore = (BudgetScore × Wb) + (LocationScore × Wl) + (PreferenceScore × Wp) + ...
```

**Multi-Phase Process:**

1. **Creation** - Admin creates decision session
2. **Collection** - Members submit constraints
3. **Processing** - Algorithm runs automatically
4. **Results** - Winner selected with reasoning

**Constraint Types:**
- **Budget**: Min/max range with weight (0-1)
- **Location**: Lat/long with max distance (km)
- **Dietary**: Hard requirements (vegetarian, vegan, gluten-free)
- **Preferences**: Soft preferences (tags, categories)
- **Must-Haves**: Required features (parking, WiFi)
- **Deal-Breakers**: Eliminating factors (smoking, loud)

**Algorithm Steps:**
1. **Filter**: Remove options violating hard constraints
2. **Score**: Calculate weighted scores per user
3. **Adjust**: Apply fairness multipliers
4. **Select**: Choose highest-scoring option
5. **Explain**: Generate human-readable reasoning

---

### 🤝 **Fairness Tracking System**

**How It Works:**
```javascript
// Track user satisfaction history
UserHistory {
  user: ObjectId,
  group: ObjectId,
  decisions: [{
    decision: ObjectId,
    satisfactionScore: Number(0-1),
    timestamp: Date
  }],
  influenceMultiplier: Number(0.7-1.5)
}

// Calculate multiplier
if (avgSatisfaction < 0.5) multiplier = 1.5  // Boost influence
if (avgSatisfaction > 0.8) multiplier = 0.7  // Reduce influence
else multiplier = 1.0  // Neutral
```

**Features:**
- Tracks every user's satisfaction
- Adjusts influence in future decisions
- Prevents dominance patterns
- Ensures long-term equity
- Visible in analytics

---

### 🤖 **AI Integration (OpenAI)**

**Smart Suggestions:**
```javascript
// Uses GPT-4 to analyze group
const suggestions = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "system",
    content: "You are a helpful assistant for group decisions"
  }, {
    role: "user",
    content: `
      Group: ${groupData.name}
      Past decisions: ${JSON.stringify(history)}
      Preferences: ${JSON.stringify(preferences)}
      
      Suggest 4 ${decisionType} options that match this group.
    `
  }],
  temperature: 0.7,
  max_tokens: 2000
});
```

**Capabilities:**
- Analyzes decision history
- Learns group preferences
- Suggests personalized options
- Explains reasoning
- Confidence scores (1-100%)

**Use Cases:**
- Restaurant recommendations
- Movie suggestions
- Activity planning
- Meeting time selection

---

### 🤝 **Conflict Resolution**

**Detects Conflicts:**
- Budget ranges don't overlap
- Incompatible dietary requirements
- Location too far for some members
- Preference mismatches

**Generates Compromises:**
1. **Budget Adjustment**: "If Alice increases $10, all satisfied"
2. **Rotation System**: "Italian this week, Steakhouse next"
3. **Fusion Option**: "Restaurant with both cuisines"
4. **Location Midpoint**: "Meet at central location"

**Smart Analysis:**
- Calculates minimal adjustments needed
- Shows trade-offs per member
- Predicts satisfaction changes
- Success probability scores

---

### 💬 **Real-Time Chat System**

**Socket.io Integration:**
```javascript
// Server-side events
socket.on('joinGroup', (groupId) => {
  socket.join(`group_${groupId}`);
  io.to(`group_${groupId}`).emit('userOnline', userId);
});

socket.on('sendMessage', async (data) => {
  const message = await Message.create(data);
  io.to(`group_${groupId}`).emit('message', message);
});

socket.on('typing', (data) => {
  socket.to(`group_${groupId}`).emit('typing', data);
});
```

**Features:**
- Real-time message delivery
- Typing indicators
- Online/offline status
- Read receipts
- Message persistence
- Edit and delete messages
- Group-specific rooms

---

### 📊 **Analytics Engine**

**Aggregation Pipelines:**
```javascript
// Decision trends
const trends = await Decision.aggregate([
  { $match: { group: groupId } },
  { $group: {
    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
    count: { $sum: 1 },
    avgSatisfaction: { $avg: "$result.avgSatisfaction" }
  }},
  { $sort: { _id: 1 } }
]);

// Category distribution
const categories = await Decision.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } }},
  { $sort: { count: -1 } }
]);
```

**Metrics Provided:**
- Total decisions made
- Success rate percentage
- Average satisfaction scores
- Decision trends over time
- Category breakdown
- User fairness metrics
- Group activity patterns

---

## 📡 Complete API Reference

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |
| PUT | `/profile` | Update profile | Yes |
| PUT | `/change-password` | Change password | Yes |
| DELETE | `/account` | Delete account | Yes |

### Groups (`/api/groups`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create group | Yes |
| GET | `/` | Get user's groups | Yes |
| GET | `/:id` | Get group details | Yes |
| PUT | `/:id` | Update group | Admin |
| DELETE | `/:id` | Delete group | Creator |
| POST | `/join` | Join with code | Yes |
| POST | `/:id/leave` | Leave group | Yes |
| DELETE | `/:id/members/:userId` | Remove member | Admin |
| PUT | `/:id/members/:userId/promote` | Promote member | Admin |

### Decisions (`/api/decisions`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create decision | Member |
| GET | `/group/:groupId` | Get group decisions | Member |
| GET | `/:id` | Get decision details | Member |
| POST | `/:id/constraints` | Submit constraints | Member |
| POST | `/:id/process` | Process decision | Auto |
| DELETE | `/:id` | Cancel decision | Admin |
| GET | `/:id/result` | Get decision result | Member |

### AI (`/api/ai`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/suggestions` | Get AI suggestions | Yes |
| POST | `/analyze-group` | Analyze preferences | Yes |

### Analytics (`/api/analytics`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/overview` | Get overview stats | Yes |
| GET | `/trends` | Get decision trends | Yes |
| GET | `/categories` | Category distribution | Yes |
| GET | `/satisfaction` | Satisfaction trends | Yes |
| GET | `/fairness/:groupId` | Group fairness | Member |

### Chat (`/api/chat`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/:groupId/messages` | Get chat history | Member |
| POST | `/:groupId/messages` | Send message | Member |
| GET | `/:groupId/unread` | Get unread count | Member |
| PUT | `/messages/:id` | Edit message | Author |
| DELETE | `/messages/:id` | Delete message | Author |

### Conflict Resolution (`/api/conflict`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/detect` | Detect conflicts | Member |
| POST | `/compromises` | Generate solutions | Member |
| POST | `/apply` | Apply compromise | Admin |

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB 6.0+ running
- npm or yarn package manager

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/hanuman2005/decision-resolver.git
cd decision-resolver/backend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your settings

# 4. Start server
npm run dev

# Server runs on http://localhost:5000
```

---

## 🔐 Environment Variables

Create `.env` file:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/decision-resolver
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Session
DECISION_SESSION_EXPIRY=24
```

---

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Group Model
```javascript
{
  name: String,
  description: String,
  inviteCode: String (6 chars, unique, indexed),
  creator: ObjectId (ref: User),
  members: [{
    user: ObjectId (ref: User),
    role: String (admin/member),
    joinedAt: Date
  }],
  memberCount: Number,
  createdAt: Date
}
```

### Decision Model
```javascript
{
  title: String,
  description: String,
  category: String,
  group: ObjectId (ref: Group),
  createdBy: ObjectId (ref: User),
  status: String (collecting/processing/completed/cancelled),
  options: [{
    name: String,
    description: String,
    metadata: Object
  }],
  constraints: [{
    user: ObjectId (ref: User),
    budget: { min, max, weight },
    location: { lat, lng, maxDistance, weight },
    preferences: [String],
    dietaryRequirements: [String],
    mustHaves: [String],
    dealBreakers: [String],
    submittedAt: Date
  }],
  result: {
    selectedOption: String,
    score: Number,
    reasoning: String,
    alternativeOptions: [{ name, score, reason }],
    memberSatisfaction: [{
      user: ObjectId,
      score: Number,
      satisfactionLevel: String
    }]
  },
  createdAt: Date,
  completedAt: Date
}
```

### UserHistory Model
```javascript
{
  user: ObjectId (ref: User),
  group: ObjectId (ref: Group),
  decisions: [{
    decision: ObjectId (ref: Decision),
    satisfactionScore: Number,
    timestamp: Date
  }],
  totalDecisions: Number,
  avgSatisfaction: Number,
  influenceMultiplier: Number,
  lastUpdated: Date
}
```

### Message Model
```javascript
{
  group: ObjectId (ref: Group),
  user: ObjectId (ref: User),
  message: String,
  type: String (text/image/file),
  readBy: [{
    user: ObjectId,
    readAt: Date
  }],
  editedAt: Date,
  createdAt: Date
}
```

---

## 🔒 Security Implementation

### Authentication Flow
```
1. User registers → Password hashed with bcrypt
2. User logs in → JWT token generated
3. Token sent in Authorization header
4. Middleware validates token
5. User object attached to req.user
```

### Security Features
- ✅ **Bcrypt Hashing**: 10 salt rounds for passwords
- ✅ **JWT Tokens**: Expire in 7 days, refresh mechanism
- ✅ **Rate Limiting**: 100 requests per 15 minutes
- ✅ **Helmet**: Sets security HTTP headers
- ✅ **CORS**: Configured whitelist
- ✅ **Input Validation**: Joi schemas on all routes
- ✅ **MongoDB Injection**: Mongoose sanitization
- ✅ **XSS Protection**: Input sanitization

---

## 📝 Logging System

Winston logger with multiple transports:

```javascript
// Log files
logs/error.log       // Error level logs
logs/combined.log    // All logs
logs/exceptions.log  // Uncaught exceptions

// Log format
{
  timestamp: "2025-12-24T10:30:00.000Z",
  level: "info",
  message: "Decision processed successfully",
  metadata: { decisionId, userId, duration }
}
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js

# Watch mode
npm run test:watch
```

---

## 🚀 Deployment

### MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create new cluster (M0 free tier)
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for dev)
5. Get connection string
6. Update `MONGODB_URI` in `.env`

### Platform Deployment

**Render / Railway:**
1. Connect GitHub repository
2. Set environment variables (all from `.env`)
3. Build command: `npm install`
4. Start command: `npm start`
5. Deploy

**Heroku:**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...
git push heroku main
```

---

## 📚 Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── logger.js          # Winston config
├── models/
│   ├── User.js
│   ├── Group.js
│   ├── Decision.js
│   ├── UserHistory.js
│   └── Message.js
├── controllers/
│   ├── authController.js
│   ├── groupController.js
│   ├── decisionController.js
│   ├── chatController.js
│   ├── aiController.js
│   └── analyticsController.js
├── routes/
│   ├── auth.js
│   ├── groups.js
│   ├── decisions.js
│   ├── chat.js
│   ├── ai.js
│   └── analytics.js
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── errorHandler.js    # Error handling
│   ├── validate.js        # Joi validation
│   └── rateLimiter.js     # Rate limiting
├── algorithms/
│   ├── decisionAlgorithm.js    # Core algorithm
│   ├── fairnessTracker.js      # Fairness logic
│   └── conflictResolver.js     # Conflict detection
├── services/
│   ├── openaiService.js   # OpenAI integration
│   ├── emailService.js    # Email sending
│   └── socketService.js   # Socket.io handlers
├── utils/
│   ├── helpers.js
│   └── constants.js
├── socket/
│   └── chatSocket.js      # Socket.io setup
├── logs/                  # Log files
├── server.js              # Entry point
├── .env                   # Environment variables
├── .env.example           # Template
└── package.json
```

---

## 🎯 Algorithm Deep Dive

### Decision Scoring Algorithm

```javascript
function scoreOption(option, constraints) {
  let totalScore = 0;
  let totalWeight = 0;
  
  constraints.forEach(constraint => {
    // Budget scoring
    const budgetScore = calculateBudgetScore(
      option.price,
      constraint.budget.min,
      constraint.budget.max
    );
    totalScore += budgetScore * constraint.budget.weight;
    totalWeight += constraint.budget.weight;
    
    // Location scoring
    const locationScore = calculateLocationScore(
      option.location,
      constraint.location
    );
    totalScore += locationScore * constraint.location.weight;
    totalWeight += constraint.location.weight;
    
    // Preference scoring
    const prefScore = calculatePreferenceScore(
      option.tags,
      constraint.preferences
    );
    totalScore += prefScore * 0.5; // Fixed weight
    totalWeight += 0.5;
  });
  
  return totalScore / totalWeight;
}

function calculateBudgetScore(price, min, max) {
  if (price < min || price > max) return 0;
  
  const midpoint = (min + max) / 2;
  const range = max - min;
  const distance = Math.abs(price - midpoint);
  
  return 1 - (distance / (range / 2));
}
```

### Fairness Adjustment

```javascript
function adjustScoresForFairness(scores, userHistories) {
  return scores.map((score, index) => {
    const history = userHistories[index];
    const multiplier = calculateMultiplier(history);
    return score * multiplier;
  });
}

function calculateMultiplier(history) {
  const { avgSatisfaction, totalDecisions } = history;
  
  if (totalDecisions < 3) return 1.0; // Not enough data
  
  if (avgSatisfaction < 0.4) return 1.5;  // Boost low satisfaction
  if (avgSatisfaction < 0.6) return 1.2;
  if (avgSatisfaction > 0.8) return 0.8;  // Reduce high satisfaction
  if (avgSatisfaction > 0.9) return 0.7;
  
  return 1.0; // Neutral
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes with tests
4. Ensure tests pass: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open Pull Request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 👨‍💻 Author

**Madineni Hanumantha Rao**

- 📧 Email: madenenihanumanturao@gmail.com
- 🐙 GitHub: [@hanuman2005](https://github.com/hanuman2005)
- 🏆 National Level Hackathon Project
- 📍 Location: Bhimavaram, Andhra Pradesh, India

---

## 🙏 Acknowledgments

- **Node.js & Express** - Robust backend framework
- **MongoDB** - Flexible NoSQL database
- **OpenAI** - GPT-4 AI capabilities
- **Socket.io** - Real-time communication
- **Open Source Community** - Amazing libraries

---

## 📞 Support

Need help? Contact us:

- **GitHub Issues**: [Report bugs](https://github.com/hanuman2005/decision-resolver/issues)
- **Email**: madenenihanumanturao@gmail.com
- **API Docs**: See `/docs/API.md` for detailed documentation

---

**Built with ❤️ for better group decisions**

_Last Updated: December 24, 2025_