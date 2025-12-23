# 🤖 Group Decision Resolver

> **Intelligent group decision-making platform using constraint satisfaction algorithms and fairness tracking**

A full-stack web application that helps groups make fair, satisfying decisions together through transparent algorithms and real-time collaboration.

## 🌟 Overview

**The Problem:** When groups need to make decisions (where to eat, when to meet, where to travel), it's hard to find options that satisfy everyone fairly.

**The Solution:** Group Decision Resolver uses AI-powered constraint satisfaction algorithms that:

- Collect individual preferences from all group members
- Apply weighted multi-criteria decision making
- Track fairness to prevent dominant voices from always winning
- Provide transparent, explainable decisions

### Perfect Use Cases:

- 👥 **Teams**: Meeting location/time decisions
- 🏨 **Groups**: Vacation planning
- 🍽️ **Friends**: Restaurant selection
- 🎬 **Clubs**: Movie or activity choices
- 💼 **Committees**: Business decisions

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **MongoDB** (cloud or local)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/hanuman2005/decision-resolver.git
cd decision-resolver
```

2. **Backend Setup**

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev  # Starts on port 5000
```

3. **Frontend Setup** (in new terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev  # Starts on port 5173
```

4. **Database Seeding** (optional)

```bash
cd backend
node scripts/seedDatabase.js
```

Visit `http://localhost:5173` and login with:

- **Email**: madenenihanumanturao@gmail.com
- **Password**: Closeone@2005

## 📚 Documentation

| Document                                          | Purpose                                    |
| ------------------------------------------------- | ------------------------------------------ |
| [Backend README](backend/README.md)               | API endpoints, algorithms, database models |
| [Frontend README](frontend/README.md)             | Components, state management, pages        |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)        | Production deployment instructions         |
| [API Testing Guide](backend/API_TESTING_GUIDE.MD) | API examples and testing                   |

## 🏗️ Architecture

### Full-Stack MERN

```
┌─────────────────────────────────────┐
│   Frontend (React 18 + Vite)        │
│   - Components: Styled-components   │
│   - State: Context API              │
│   - Routing: React Router v6        │
└────────────┬────────────────────────┘
             │ REST API (Axios)
┌────────────▼────────────────────────┐
│   Backend (Express.js + Node.js)    │
│   - API Routes & Controllers        │
│   - Authentication (JWT + Bcrypt)   │
│   - Smart Algorithms                │
│   - Email Notifications             │
└────────────┬────────────────────────┘
             │ Query
┌────────────▼────────────────────────┐
│   MongoDB (Mongoose ODM)            │
│   - User & Auth data                │
│   - Groups & Members                │
│   - Decisions & Constraints         │
│   - Chat & Fairness Metrics         │
└─────────────────────────────────────┘
```

## 🎯 Key Features

### ✨ Complete Feature Set

| Feature                 | Status      | Details                     |
| ----------------------- | ----------- | --------------------------- |
| **User Authentication** | ✅ Complete | Register, login, JWT tokens |
| **Group Management**    | ✅ Complete | Create, join, invite, roles |
| **Decision Making**     | ✅ Complete | Multi-phase, constraints    |
| **Smart Algorithm**     | ✅ Complete | Fairness tracking included  |
| **Real-time Chat**      | ✅ Complete | Messages, read receipts     |
| **Analytics**           | ✅ Complete | Dashboard, fairness metrics |
| **Email Notifications** | ✅ Complete | Gmail SMTP configured       |
| **Error Handling**      | ✅ Complete | Global error handling       |

## 📊 Technology Stack

### Frontend

```
React 18              - UI library
Vite 5                - Build tool
React Router v6       - Routing
Styled-Components 6   - Styling
Axios                 - HTTP client
React Context API     - State management
React Hot Toast       - Notifications
Lucide React          - Icons
```

### Backend

```
Node.js 18+           - Runtime
Express.js 4          - Web framework
MongoDB 6+            - Database
Mongoose 7            - ODM
JWT                   - Authentication
Bcrypt                - Password hashing
Nodemailer            - Email service
Winston               - Logging
Helmet                - Security
```

## 📂 Project Structure

```
decision-resolver/
├── backend/
│   ├── config/                      # Configuration
│   ├── models/                      # MongoDB schemas
│   ├── controllers/                 # Request handlers
│   ├── routes/                      # API routes
│   ├── middleware/                  # Custom middleware
│   ├── algorithms/                  # Decision algorithms
│   ├── services/                    # Business logic
│   ├── utils/                       # Helper functions
│   ├── scripts/                     # Database seeding
│   ├── server.js                    # Entry point
│   ├── .env.example                 # Environment template
│   └── README.md                    # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── context/                 # Context providers
│   │   ├── services/                # API service layer
│   │   ├── utils/                   # Utilities
│   │   ├── hooks/                   # Custom hooks
│   │   ├── styles/                  # Global styles
│   │   ├── App.jsx                  # Main component
│   │   └── main.jsx                 # Entry point
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite config
│   ├── .env.example                 # Environment template
│   └── README.md                    # Frontend documentation
│
├── DEPLOYMENT_GUIDE.md              # Production deployment
├── docker-compose.yml               # Docker setup
├── vercel.json                      # Vercel configuration
├── render.yaml                      # Render configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🧮 Algorithm Explanation

### How Decisions Are Made

**Phase 1: Constraint Collection**

- Each member submits preferences (budget, location, diet, etc.)
- Members specify must-haves and deal-breakers
- System tracks constraints and requirements

**Phase 2: Option Filtering**

- Remove options violating hard constraints
- Filter by dietary requirements
- Verify location and budget compatibility

**Phase 3: Weighted Scoring**

```
UserScore = (BudgetScore × Wb) + (LocationScore × Wl) + (PreferenceScore × Wp)
```

**Phase 4: Fairness Adjustment**

- Tracks each user's satisfaction history
- Under-satisfied users get higher influence (1.5x)
- Over-satisfied users get lower influence (0.7x)
- Ensures long-term fairness

**Phase 5: Selection**

```
FinalScore = Σ [UserScore × FairnessMultiplier] / N
```

Choose option with highest final score

**Phase 6: Explanation**

- Provide transparent reasoning
- Show per-user scores
- Explain fairness adjustments

## 🚀 Deployment

### Quick Deployment

**Frontend → Vercel** ([DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))

```bash
1. Push to GitHub
2. Connect to Vercel
3. Set VITE_API_URL environment variable
4. Deploy
```

**Backend → Render** ([DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))

```bash
1. Push to GitHub
2. Connect to Render
3. Set environment variables (MongoDB URI, JWT, Gmail)
4. Deploy
```

**Database → MongoDB Atlas**

- Create free cluster
- Get connection string
- Add to backend environment

## 🔐 Security

- ✅ **Password Security**: Bcrypt with 10 salt rounds
- ✅ **Authentication**: JWT tokens with 7-day expiry
- ✅ **API Security**: Helmet headers, CORS, rate limiting
- ✅ **Input Validation**: Joi schema validation
- ✅ **Injection Prevention**: MongoDB parameterization
- ✅ **XSS Protection**: React auto-escaping
- ✅ **Data Protection**: Encrypted sensitive data

## 📊 Database Schema

### Collections

- **Users**: Authentication and profiles
- **Groups**: Team management with roles
- **DecisionSessions**: Decision metadata and results
- **Constraints**: Member preferences and requirements
- **ChatMessages**: Group conversations
- **UserHistory**: Fairness metrics per user

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
npm run test:coverage
npm run test:watch
```

### Frontend Tests

```bash
cd frontend
npm test
npm run test:coverage
```

## 📈 API Endpoints

### Authentication

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get profile
PUT    /api/auth/profile         - Update profile
```

### Groups

```
POST   /api/groups               - Create group
GET    /api/groups               - Get user's groups
GET    /api/groups/:id           - Get group details
POST   /api/groups/join          - Join group
DELETE /api/groups/:id/leave     - Leave group
```

### Decisions

```
POST   /api/decisions            - Create decision
GET    /api/decisions/:id        - Get decision
POST   /api/decisions/:id/constraints - Submit constraints
POST   /api/decisions/:id/process - Process decision
```

### Chat

```
GET    /api/chat/:groupId        - Get messages
POST   /api/chat/:groupId        - Send message
PUT    /api/chat/messages/:id    - Edit message
DELETE /api/chat/messages/:id    - Delete message
```

Full API docs: [Backend README](backend/README.md)

## 🎨 UI Components

All components use **Styled-Components** with:

- Dark theme
- Responsive design
- Smooth animations
- Accessible markup
- Custom hooks

### Component Library

- `<Button>` - Various styles and sizes
- `<Input>` - Form input with validation
- `<Card>` - Content container
- `<Modal>` - Dialog component
- `<Loading>` - Loader spinner
- `<Navbar>` - Navigation bar

## 🌟 Sample Data

Run the seed script to populate with sample data:

```bash
cd backend
node scripts/seedDatabase.js
```

Creates:

- 6 test users
- 4 sample groups
- 5 decision sessions
- 8 chat messages

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Style

- Use ESLint configuration
- Follow React best practices
- Write descriptive commit messages
- Add tests for new features

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 👨‍💻 Author

**Madineni Hanumantha Rao**

- 📧 Email: madenenihanumanturao@gmail.com
- 🐙 GitHub: [@hanuman2005](https://github.com/hanuman2005)
- 🎓 National Level Hackathon Project

## 🙏 Acknowledgments

- React and modern JavaScript community
- MongoDB and database design patterns
- Constraint satisfaction literature
- Open-source contributors

## 📞 Support & Contact

- **Found a bug?** [Open an issue](https://github.com/hanuman2005/decision-resolver/issues)
- **Have a question?** Email: madenenihanumanturao@gmail.com
- **Deployment help?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🗺️ Roadmap

- [ ] Real-time WebSocket chat updates
- [ ] User profile avatars
- [ ] Advanced analytics with charts
- [ ] Mobile app (React Native)
- [ ] Video call integration
- [ ] Decision templates
- [ ] Integration with Google Calendar
- [ ] Multi-language support

## 📺 Demo

**Live Demo**: [Coming soon]

**Test Credentials**:

```
Email: madenenihanumanturao@gmail.com
Password: Closeone@2005
```

---

<div align="center">

### Built with ❤️ for better group decisions

**[⬆ back to top](#-group-decision-resolver)**

</div>

_Last Updated: December 23, 2025_
