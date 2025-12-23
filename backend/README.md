# Group Decision Resolver - Backend

## 🎯 Overview

Backend API for Group Decision Resolver - an intelligent web application that helps groups make decisions using constraint satisfaction algorithms and fairness tracking.

## 🏗️ Architecture

- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- MongoDB 6.0+
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB** (if running locally)
```bash
mongod --dbpath /path/to/data
```

5. **Run the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/group-decision-resolver
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
DECISION_SESSION_EXPIRY=24
```

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |
| PUT | `/change-password` | Change password | Yes |
| DELETE | `/account` | Deactivate account | Yes |

### Groups (`/api/groups`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new group | Yes |
| GET | `/` | Get user's groups | Yes |
| GET | `/:id` | Get group by ID | Yes (Member) |
| PUT | `/:id` | Update group | Yes (Admin) |
| DELETE | `/:id` | Delete group | Yes (Creator) |
| POST | `/join` | Join group with code | Yes |
| POST | `/:id/leave` | Leave group | Yes |
| DELETE | `/:id/members/:memberId` | Remove member | Yes (Admin) |
| PUT | `/:id/members/:memberId/promote` | Promote to admin | Yes (Admin) |

### Decisions (`/api/decisions`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create decision session | Yes (Member) |
| GET | `/group/:groupId` | Get group decisions | Yes (Member) |
| GET | `/:id` | Get decision by ID | Yes (Member) |
| POST | `/:id/constraints` | Submit constraints | Yes (Member) |
| POST | `/:id/process` | Trigger processing | Yes (Admin) |
| DELETE | `/:id` | Cancel decision | Yes (Admin) |
| GET | `/fairness/:groupId` | Get fairness insight | Yes (Member) |

## 🔑 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Example Request

```bash
curl -H "Authorization: Bearer eyJhbGc..." \
     http://localhost:5000/api/auth/me
```

## 📝 Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64abc...",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Group

**Request:**
```json
POST /api/groups
Authorization: Bearer <token>
{
  "name": "Weekend Crew",
  "description": "Friends deciding weekend activities"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Group created successfully",
  "data": {
    "group": {
      "_id": "64abc...",
      "name": "Weekend Crew",
      "description": "Friends deciding weekend activities",
      "inviteCode": "ABC12XYZ",
      "memberCount": 1,
      "members": [...]
    }
  }
}
```

### Submit Constraints

**Request:**
```json
POST /api/decisions/:id/constraints
Authorization: Bearer <token>
{
  "budget": {
    "min": 20,
    "max": 50,
    "weight": 0.8
  },
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "maxDistance": 5,
    "weight": 0.6
  },
  "preferences": ["italian", "outdoor-seating"],
  "dietaryRequirements": ["vegetarian"],
  "mustHaves": ["parking"],
  "dealBreakers": ["loud-music"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Constraints submitted. All members have submitted - processing decision now!",
  "data": {
    "decision": {...},
    "autoProcessing": true
  }
}
```

## 🧮 Algorithm Details

### Constraint Satisfaction Algorithm

The core algorithm uses **Weighted Multi-Criteria Decision Making** with fairness adjustments:

1. **Filtering**: Remove options violating hard constraints (deal-breakers, dietary restrictions)
2. **Scoring**: Calculate weighted score for each option per user
3. **Fairness Adjustment**: Apply influence multipliers based on historical fairness
4. **Selection**: Choose highest-scoring option
5. **Explanation**: Generate human-readable reasoning

### Scoring Formula

```
Score(option) = Σ [UserScore(user, option) × FairnessMultiplier(user)] / MaxPossible

UserScore = (BudgetScore × Wb) + (LocationScore × Wl) + (PreferenceScore × Wp) + ...
```

### Fairness Tracking

- Tracks each user's satisfaction across decisions
- Users who rarely get preferences → higher influence (1.5x)
- Users who often get preferences → lower influence (0.7x)
- Ensures long-term group balance

## 📊 Database Models

### User
- Authentication & profile
- Default preferences
- Account status

### Group
- Name, description
- Members with roles (admin/member)
- Unique invite code

### DecisionSession
- Title, category, status
- Constraints from all members
- Options to evaluate
- Final decision with reasoning
- Detailed scoring breakdown

### UserHistory
- Decision participation history
- Fairness metrics per group
- Influence multiplier calculation

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents abuse
- **Helmet**: Security headers
- **CORS**: Controlled cross-origin access
- **Input Validation**: Joi schemas
- **SQL Injection Protection**: Mongoose parameterization

## 🐛 Error Handling

All errors follow consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

## 📝 Logging

Uses Winston for structured logging:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs
- `logs/exceptions.log` - Uncaught exceptions

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Deployment Platforms

**Render / Railway / Heroku:**

1. Connect GitHub repository
2. Set environment variables
3. Deploy from main branch

**Environment Variables to Set:**
- `NODE_ENV=production`
- `MONGODB_URI=<atlas_connection_string>`
- `JWT_SECRET=<secure_random_string>`
- `FRONTEND_URL=<your_frontend_url>`

## 📚 Project Structure

```
backend/
├── config/          # Configuration files
├── models/          # Mongoose models
├── controllers/     # Request handlers
├── routes/          # API routes
├── middleware/      # Custom middleware
├── algorithms/      # Decision & fairness logic
├── utils/           # Helper functions
├── logs/            # Log files
├── server.js        # Entry point
└── package.json
```

## 🤝 Contributing

1. Create feature branch
2. Make changes with tests
3. Ensure all tests pass
4. Submit pull request

## 📄 License

MIT License

## 👨‍💻 Author

Your Name - National Level Hackathon Project

## 🆘 Support

For issues or questions:
- Create GitHub issue
- Email: your-email@example.com

---

**Built with ❤️ for better group decisions**
