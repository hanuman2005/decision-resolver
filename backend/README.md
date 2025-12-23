# 🤖 Group Decision Resolver - Backend

A powerful REST API for intelligent group decision-making using constraint satisfaction algorithms, fairness tracking, and real-time processing.

## 🌟 Project Overview

**Group Decision Resolver** is a full-stack web application that solves a critical problem: **How can groups make fair, satisfying decisions together?**

The backend implements sophisticated algorithms that:

- Collect individual constraints and preferences from group members
- Apply constraint satisfaction and multi-criteria decision making
- Track fairness across decisions to give underrepresented voices more weight
- Generate transparent, explainable decisions
- Provide detailed analytics and insights

### Perfect For:

- 👥 Teams choosing meeting locations or times
- 🏨 Groups planning vacations together
- 🍽️ Friends deciding where to eat
- 🎬 Groups selecting movies or activities
- 💼 Workplace committees making decisions

## 🏗️ Technology Stack

| Component          | Technology                  |
| ------------------ | --------------------------- |
| **Runtime**        | Node.js 18+                 |
| **Framework**      | Express.js 4.x              |
| **Database**       | MongoDB 6.0+ (Atlas)        |
| **ODM**            | Mongoose 7.x                |
| **Authentication** | JWT + Bcrypt                |
| **Validation**     | Joi                         |
| **Email**          | Nodemailer (Gmail SMTP)     |
| **Logging**        | Winston                     |
| **Security**       | Helmet, CORS, Rate Limiting |
| **Environment**    | dotenv                      |

## ✨ Key Features

### 🔐 Authentication & Users

- User registration with email verification
- Secure JWT-based authentication
- Password hashing with Bcrypt
- Profile management
- Account deletion

### 👥 Group Management

- Create and manage groups
- Invite members with unique codes
- Role-based access control (Admin/Member)
- Member promotion and removal
- Group settings and metadata

### ⚖️ Decision Making

- Create decision sessions with multiple options
- Multi-phase decision process:
  1. **Constraint Collection** - Members submit preferences
  2. **Processing** - Algorithm evaluates options
  3. **Results** - Transparent decision with reasoning
- Support for diverse decision types:
  - Travel & vacation planning
  - Food & restaurant selection
  - Activity & event scheduling
  - Shopping & product choices
  - Meeting logistics

### 🎯 Smart Algorithms

- **Constraint Satisfaction**: Hard constraints (deal-breakers, dietary)
- **Weighted Scoring**: Multi-criteria evaluation per user
- **Fairness Adjustment**: Historical tracking prevents dominance
- **Transparent Reasoning**: Explains why option was selected

### 📊 Analytics & Insights

- User fairness metrics
- Decision satisfaction tracking
- Group fairness insights
- Personal analytics dashboard
- Historical decision data

### 💬 Real-time Chat

- Group messaging system
- Message read receipts
- Message editing and deletion
- Conversation history

### 📧 Email Notifications

- Decision invitations
- Result announcements
- Group activity updates
- Account notifications

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

| Method | Endpoint           | Description              | Auth Required |
| ------ | ------------------ | ------------------------ | ------------- |
| POST   | `/register`        | Register new user        | No            |
| POST   | `/login`           | Login user               | No            |
| GET    | `/me`              | Get current user profile | Yes           |
| PUT    | `/profile`         | Update user profile      | Yes           |
| PUT    | `/change-password` | Change password          | Yes           |
| DELETE | `/account`         | Deactivate account       | Yes           |

### Groups (`/api/groups`)

| Method | Endpoint                         | Description          | Auth Required |
| ------ | -------------------------------- | -------------------- | ------------- |
| POST   | `/`                              | Create new group     | Yes           |
| GET    | `/`                              | Get user's groups    | Yes           |
| GET    | `/:id`                           | Get group by ID      | Yes (Member)  |
| PUT    | `/:id`                           | Update group         | Yes (Admin)   |
| DELETE | `/:id`                           | Delete group         | Yes (Creator) |
| POST   | `/join`                          | Join group with code | Yes           |
| POST   | `/:id/leave`                     | Leave group          | Yes           |
| DELETE | `/:id/members/:memberId`         | Remove member        | Yes (Admin)   |
| PUT    | `/:id/members/:memberId/promote` | Promote to admin     | Yes (Admin)   |

### Decisions (`/api/decisions`)

| Method | Endpoint             | Description             | Auth Required |
| ------ | -------------------- | ----------------------- | ------------- |
| POST   | `/`                  | Create decision session | Yes (Member)  |
| GET    | `/group/:groupId`    | Get group decisions     | Yes (Member)  |
| GET    | `/:id`               | Get decision by ID      | Yes (Member)  |
| POST   | `/:id/constraints`   | Submit constraints      | Yes (Member)  |
| POST   | `/:id/process`       | Trigger processing      | Yes (Admin)   |
| DELETE | `/:id`               | Cancel decision         | Yes (Admin)   |
| GET    | `/fairness/:groupId` | Get fairness insight    | Yes (Member)  |

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

## 🚀 Database Seeding

To populate your database with sample data:

```bash
cd backend
node scripts/seedDatabase.js
```

This creates:

- 6 test users
- 4 sample groups
- 5 decision sessions
- 8 chat messages

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes with tests
3. Ensure all tests pass: `npm test`
4. Submit pull request

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Madineni Hanumantha Rao**

- Email: madenenihanumanturao@gmail.com
- GitHub: [@hanuman2005](https://github.com/hanuman2005)
- National Level Hackathon Project

## 🙏 Acknowledgments

- Inspired by real-world group decision challenges
- Built with modern Node.js and MongoDB technologies

## 📞 Support

For issues or questions:

- Create GitHub issue
- Email: madenenihanumanturao@gmail.com
- See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for deployment help

---

**Built with ❤️ for better group decisions**

_Last Updated: December 23, 2025_
