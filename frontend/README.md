# 🎯 Group Decision Resolver - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-5.x-purple)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **🏆 National Level Hackathon Project**  
> Making fair, transparent group decisions in seconds using AI-powered algorithms and beautiful UI

[🚀 Live Demo](#) | [📹 Video Demo](#) | [📖 Backend Repository](#)

---

## 🌟 Project Overview

**Group Decision Resolver** is a modern, full-featured React application that revolutionizes how groups make decisions together. Built with cutting-edge technologies and featuring 13+ advanced capabilities, this platform combines intelligent algorithms with beautiful user experience.

**Built with:** React 18 · Vite · Styled-Components · React Router v6 · Socket.io · OpenAI

---

## 🎯 The Problem We Solve

Groups waste **hours** on simple decisions:
- 😤 **Endless debates** in group chats
- 🤷 **Indecisiveness** - no one wants to choose
- 😕 **Unfair outcomes** - someone always loses
- ⏰ **Time wasted** on trivial choices

## 💡 Our Solution

**Group Decision Resolver** makes decisions in **2 minutes**:
- ⚡ **10x Faster** - AI processes constraints instantly
- 🤝 **100% Fair** - Tracks history to prevent dominance
- 🔍 **Transparent** - Shows exactly why decisions were made
- 🤖 **AI-Powered** - Smart suggestions from OpenAI

---

## ✨ Complete Feature Set (13+ Features)

### 🏗️ **Core Features**

#### 1. **Intelligent Decision Making** ⚖️
Advanced constraint satisfaction algorithm that considers:
- **Budget ranges** with custom weights
- **Location preferences** with distance limits
- **Dietary requirements** (vegetarian, vegan, gluten-free, etc.)
- **Personal preferences** and tags
- **Must-haves** (parking, WiFi, outdoor seating)
- **Deal-breakers** (smoking, loud music, crowds)

**Result Display:**
- Winner with confidence score
- Detailed reasoning explanation
- Per-user satisfaction metrics
- Alternative options ranked
- Fairness adjustments shown

#### 2. **Group Management** 👥
Complete lifecycle management:
- Create groups with descriptions
- Generate unique 6-character invite codes
- Join groups instantly with codes
- Role-based access (Admin/Member)
- Member promotion and removal
- Leave or delete groups
- Real-time member list updates

#### 3. **User Authentication** 🔐
Secure JWT-based system:
- Registration with validation
- Login with persistent sessions
- Protected routes with auto-redirect
- Profile management
- Password change
- Account settings
- Auto-logout on token expiry

---

### 🚀 **Advanced Features**

#### 4. **Analytics Dashboard** 📊
Professional data visualization with interactive charts:
- **Overview Stats**: Total groups, active decisions, completion rate, satisfaction scores
- **Decision Trends**: Line charts showing activity over time
- **Category Distribution**: Pie charts of decision types
- **Satisfaction Tracking**: Area charts of user happiness over time
- **Top Categories**: Bar charts of most popular choices
- **Time Range Filters**: 7/30/90 days, all-time views

**Tech Stack:** Recharts library for responsive, animated visualizations

#### 5. **Dark Mode Theme** 🌙
Complete theme system with:
- Beautiful dark/light color schemes
- Persistent user preference (localStorage)
- System preference detection
- Smooth transitions on all 90+ components
- Context API for global state
- Zero external dependencies

#### 6. **PDF Export** 📄
Generate professional decision reports:
- Decision information and results
- Group details and statistics
- Member constraints table
- Alternative options list
- Decision reasoning
- Timestamp and branding
- Uses native browser print (no libraries needed)
- Export as PDF or CSV formats

#### 7. **Real-Time Notifications** 🔔
Live updates with Socket.io:
- Member activity (joins, leaves, promotions)
- Decision updates (constraints submitted, processing, complete)
- Chat messages and mentions
- Beautiful dropdown UI with badge counts
- Read/unread tracking
- Timestamp formatting
- Mark all as read functionality

#### 8. **Voice Input** 🎤
Natural language constraint submission:
- Uses Web Speech API (native browser)
- Speaks constraints like "My budget is $20 to $50"
- Auto-parses and fills form fields
- Real-time transcription display
- Confidence scores shown
- Works in Chrome, Edge, Safari
- Accessibility-first feature

#### 9. **Decision Templates** 📋
Quick-start pre-built scenarios:
- **Friday Night Dinner** - Restaurant selection
- **Weekend Movie** - Movie genre choice
- **Team Lunch** - Quick office lunch
- **Birthday Party** - Venue selection
- **Coffee Meetup** - Cafe selection
- **Meeting Time** - Schedule coordination
- Each template includes default options and constraints
- Search and filter functionality

#### 10. **Group Chat** 💬
Real-time messaging system:
- Live message delivery with Socket.io
- Typing indicators
- Read receipts (✓✓)
- Message timestamps
- Online/offline status
- Emoji support
- Member list sidebar
- Auto-scroll to latest messages

#### 11. **AI Suggestions** 🤖
OpenAI-powered recommendations:
- Analyzes group history and preferences
- Suggests 4 personalized options
- Shows confidence scores (1-100%)
- Explains reasoning for each suggestion
- One-click add to decision
- Works for restaurants, movies, activities, etc.
- Uses GPT-4 for intelligent analysis

#### 12. **Conflict Resolution** 🤝
Smart compromise suggestions:
- Detects when no option satisfies everyone
- AI generates 4 compromise scenarios:
  - Budget adjustments needed
  - Rotating choice system
  - Fusion/hybrid options
  - Location compromises
- Shows trade-offs for each member
- Calculates satisfaction impact
- Success probability scores
- Apply compromise with group approval

#### 13. **Enhanced User Experience** ✨
Polish and professionalism:
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states and skeletons
- Toast notifications (success, error, info)
- Modal confirmations
- Empty states with CTAs
- Error handling with helpful messages
- Form validation with inline errors
- Accessible components (WCAG compliant)

---

## 🏗️ Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Frontend Library** | React | 18.x | Component-based UI |
| **Build Tool** | Vite | 5.x | Lightning-fast dev & build |
| **Routing** | React Router | 6.x | Client-side navigation |
| **Styling** | Styled-Components | 6.x | CSS-in-JS styling |
| **HTTP Client** | Axios | 1.x | API communication |
| **State Management** | Context API | Built-in | Global state |
| **Charts** | Recharts | Latest | Data visualization |
| **Icons** | Lucide React | Latest | Beautiful icons |
| **Notifications** | React Hot Toast | 2.x | Toast messages |
| **Real-time** | Socket.io Client | 4.x | WebSocket communication |
| **Voice** | Web Speech API | Native | Voice recognition |

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 18.0 or higher ([Download](https://nodejs.org))
- **npm** 9.0+ or **yarn** 3.0+
- **Backend server** running (see backend README)
- **Git** for version control

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/hanuman2005/decision-resolver.git
cd decision-resolver/frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your backend URL

# 4. Start development server
npm run dev

# App runs at http://localhost:5173
```

### Environment Variables

Create `.env` file:

```env
# Backend API
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=Group Decision Resolver
VITE_APP_VERSION=1.0.0
```

**Production:**
```env
VITE_API_URL=https://your-backend-api.onrender.com
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Loading/
│   │   │   ├── Navbar/
│   │   │   └── Footer/
│   │   ├── decisions/       # Decision-specific
│   │   │   ├── ConstraintForm.jsx
│   │   │   ├── DecisionResult.jsx
│   │   │   └── ScoringVisualization.jsx
│   │   ├── groups/          # Group components
│   │   │   ├── GroupCard.jsx
│   │   │   └── GroupList.jsx
│   │   └── chat/            # Chat system
│   │       └── GroupChat.jsx
│   ├── pages/
│   │   ├── Home/            # Landing page
│   │   ├── Dashboard/       # User dashboard
│   │   ├── Analytics/       # Analytics dashboard
│   │   ├── Groups/          # Group management
│   │   ├── CreateGroup/
│   │   ├── JoinGroup/
│   │   ├── GroupDetails/
│   │   ├── CreateDecision/
│   │   ├── SubmitConstraints/
│   │   ├── DecisionDetail/
│   │   ├── Templates/       # Decision templates
│   │   ├── Profile/
│   │   ├── About/
│   │   └── auth/            # Auth pages
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── GroupContext.jsx
│   │   ├── DarkModeContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── ChatContext.jsx
│   ├── services/
│   │   ├── api.js           # Axios config
│   │   ├── authService.js
│   │   ├── groupService.js
│   │   ├── decisionService.js
│   │   ├── chatService.js
│   │   ├── aiService.js
│   │   └── analyticsService.js
│   ├── utils/
│   │   ├── formatters.js    # Date, number, text formatters
│   │   └── validators.js    # Form validation
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── public/
├── index.html
├── vite.config.js
├── package.json
└── .env
```

---

## 🎨 Styling System

### Styled-Components Architecture

All components use **Styled-Components** for maintainable, scoped styling:

```javascript
// Example styled component
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;
```

### Color Palette

```javascript
// Light Mode
primary: #3B82F6      // Blue
secondary: #8B5CF6    // Purple
success: #10B981      // Green
warning: #F59E0B      // Amber
danger: #EF4444       // Red
background: #F8FAFC   // Light gray
text: #0F172A         // Dark gray

// Dark Mode
primary: #60A5FA      // Light blue
secondary: #A78BFA    // Light purple
background: #0F172A   // Dark blue-gray
text: #F1F5F9         // Light gray
```

### Responsive Breakpoints

```javascript
mobile: 320px   // Small phones
tablet: 768px   // Tablets
desktop: 1024px // Desktops
wide: 1280px    // Large screens
```

---

## 🔄 State Management

### Global Contexts

**AuthContext:**
```jsx
const { user, isAuthenticated, login, logout, register } = useAuth();
```

**GroupContext:**
```jsx
const { groups, selectedGroup, loading, createGroup, joinGroup } = useGroups();
```

**DarkModeContext:**
```jsx
const { isDarkMode, toggleDarkMode } = useDarkMode();
```

**NotificationContext:**
```jsx
const { notifications, unreadCount, markAsRead, clearNotification } = useNotifications();
```

**ChatContext:**
```jsx
const { messages, sendMessage, typingUsers, emitTyping } = useChat();
```

---

## 🌐 API Integration

### Service Architecture

All API calls abstracted into clean service files:

```javascript
// authService.js
await authService.register(userData);
await authService.login(credentials);
await authService.getProfile();
await authService.updateProfile(data);

// groupService.js  
await groupService.getMyGroups();
await groupService.createGroup(data);
await groupService.joinGroup(inviteCode);
await groupService.getGroupDetails(id);

// decisionService.js
await decisionService.createDecision(data);
await decisionService.submitConstraints(id, constraints);
await decisionService.getDecisionResult(id);

// aiService.js
await aiService.getSuggestions(groupId, type);

// analyticsService.js
await analyticsService.getOverviewStats();
await analyticsService.getDecisionTrends(timeRange);
```

### Axios Configuration

```javascript
// Automatic features:
- JWT token injection in headers
- Request/response interceptors
- Error handling with auto-redirect
- Timeout configuration (10s)
- Base URL management
- Retry logic for failed requests
```

---

## 🧪 Testing & Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking (if using TypeScript)
npm run type-check

# Build and test production bundle
npm run build
npm run preview
```

---

## 🚀 Build & Deployment

### Development

```bash
npm run dev
# Runs on http://localhost:5173
# Hot module replacement enabled
```

### Production Build

```bash
npm run build
# Output: dist/ directory
# Optimized, minified, tree-shaken
```

### Preview Production Build

```bash
npm run preview
# Test production build locally
```

---

## 📦 Deployment Platforms

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
4. Deploy automatically on push

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Protected Routes** - Automatic auth checks
- ✅ **XSS Protection** - React auto-escaping
- ✅ **CSRF Tokens** - Request validation
- ✅ **Input Sanitization** - All user inputs validated
- ✅ **HTTPS Enforcement** - In production
- ✅ **Secure Storage** - Encrypted localStorage
- ✅ **Rate Limiting** - API abuse prevention

---

## 🐛 Error Handling

### Comprehensive System

- **Axios Interceptors** - Catch all API errors
- **Toast Notifications** - User-friendly feedback
- **Form Validation** - Inline error messages
- **Fallback Pages** - 404, 500 error pages
- **Loading States** - Prevent multiple submissions
- **Retry Logic** - Auto-retry failed requests

---

## 📱 Responsive Design

Fully responsive across all devices:

| Device | Layout | Features |
|--------|--------|----------|
| **Mobile** (320px+) | Single column | Touch-optimized, bottom nav |
| **Tablet** (768px+) | Two columns | Side drawer, grid layouts |
| **Desktop** (1024px+) | Multi-column | Full sidebar, max features |
| **Wide** (1280px+) | Expanded | More whitespace, larger charts |

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open Pull Request

### Code Style

- Use functional components
- Follow React hooks best practices
- Use styled-components for styling
- Add comments for complex logic
- Write meaningful commit messages

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [Styled-Components](https://styled-components.com)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)
- [Recharts Examples](https://recharts.org/en-US/examples)

---

## 🎯 Project Highlights

### What Makes This Special

1. **13+ Advanced Features** - Beyond basic CRUD
2. **AI Integration** - OpenAI GPT-4 for suggestions
3. **Real-time Everything** - Socket.io for live updates
4. **Beautiful UI** - Gradient designs, smooth animations
5. **Accessibility First** - Voice input, WCAG compliant
6. **Production Ready** - Error handling, logging, security

### Technical Achievements

- **90+ Components** - Modular, reusable architecture
- **5 Context Providers** - Efficient state management
- **8 Service Files** - Clean API abstraction
- **Dark Mode** - Complete theme system
- **Voice Recognition** - Native Web Speech API
- **PDF Generation** - No external libraries

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

- **React Team** - For the amazing framework
- **Vite Team** - For blazing-fast build tool
- **OpenAI** - For AI capabilities
- **Open Source Community** - For incredible libraries
- **Hackathon Organizers** - For the opportunity

---

## 📞 Support

Need help? Reach out:

- **GitHub Issues**: [Report bugs or request features](https://github.com/hanuman2005/decision-resolver/issues)
- **Email**: madenenihanumanturao@gmail.com
- **Documentation**: Full docs in `/docs` folder

---

**Built with ❤️ using React, Styled-Components, and modern web technologies**

_Last Updated: December 24, 2025_