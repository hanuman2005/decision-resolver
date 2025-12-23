# 🎨 Group Decision Resolver - Frontend

A modern, responsive React web application for making fair group decisions with beautiful UI and seamless user experience.

## 🌟 Project Overview

**Group Decision Resolver Frontend** provides an intuitive interface for:

- Creating and managing groups
- Setting up decision sessions
- Submitting personal constraints and preferences
- Viewing transparent decision results with explanations
- Analyzing group fairness metrics
- Real-time chat and notifications

Built with **React 18**, **Vite**, **Styled-Components**, and **React Router v6** for maximum performance and developer experience.

## 🏗️ Technology Stack

| Component            | Technology        | Version  |
| -------------------- | ----------------- | -------- |
| **Frontend Library** | React             | 18.x     |
| **Build Tool**       | Vite              | 5.x      |
| **Routing**          | React Router      | 6.x      |
| **Styling**          | Styled-Components | 6.x      |
| **HTTP Client**      | Axios             | 1.x      |
| **State Management** | React Context API | Built-in |
| **UI Components**    | Lucide React      | Latest   |
| **Notifications**    | React Hot Toast   | 2.x      |
| **Form Handling**    | React Hook Form   | 7.x      |
| **Package Manager**  | npm or yarn       | Latest   |

## ✨ Key Features

### 🔐 Authentication

- User registration with real-time validation
- Secure JWT-based login
- Protected routes with automatic redirects
- Persistent sessions using localStorage
- Auto-logout on token expiry
- Profile management

### 👥 Group Management

- Create groups with descriptive details
- Join groups using 6-character invite codes
- View group members and their roles
- Admin controls (promote members, remove members)
- Leave or delete groups
- Real-time group updates

### ⚖️ Decision Making

- **Create Decisions**: Define options and categories
- **Submit Constraints**:
  - Budget range with weight
  - Location preferences with distance
  - Dietary requirements
  - Personal preferences and tags
  - Must-haves and deal-breakers
- **View Results**:
  - Winning option with confidence score
  - Detailed reasoning explanation
  - Per-user satisfaction metrics
  - Fairness adjustments displayed
  - Alternative options ranking

### 📊 Analytics & Insights

- Personal dashboard with statistics
- Group fairness tracking
- Decision history with outcomes
- Monthly analytics trends
- User satisfaction metrics

### 💬 Real-time Features

- Group messaging and chat
- Message read receipts
- Edit and delete messages
- Activity feed
- Typing indicators (when implemented)

### 🎨 User Experience

- Fully responsive design (mobile, tablet, desktop)
- Dark theme with beautiful gradients
- Smooth animations and transitions
- Loading states and spinners
- Toast notifications for feedback
- Modal dialogs for confirmations
- Accessible components
- Error handling with helpful messages

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 18.0 or higher ([Download](https://nodejs.org))
- **npm** 9.0+ or **yarn** 3.0+
- **Backend server** running on http://localhost:5000
- **Git** for version control

### Step-by-Step Installation

1. **Clone the repository**

```bash
git clone https://github.com/hanuman2005/decision-resolver.git
cd decision-resolver/frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000
```

4. **Start development server**

```bash
npm run dev
```

Application will open at `http://localhost:5173`

5. **Build for production**

```bash
npm run build
```

Output directory: `dist/`

## 🔐 Environment Variables

Create a `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Optional: Analytics (if implemented)
VITE_APP_NAME=Group Decision Resolver
VITE_APP_VERSION=1.0.0
```

### For Production

```env
VITE_API_URL=https://your-backend-api.onrender.com
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx         # Reusable button
│   │   │   ├── Input.jsx          # Form input
│   │   │   ├── Card.jsx           # Card container
│   │   │   ├── Modal.jsx          # Modal dialog
│   │   │   ├── Loading.jsx        # Loader component
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── Footer.jsx         # Footer component
│   │   ├── decisions/
│   │   │   ├── ConstraintForm.jsx
│   │   │   ├── DecisionHistory.jsx
│   │   │   ├── DecisionResult.jsx
│   │   │   └── ScoringVisualization.jsx
│   │   └── groups/
│   │       ├── GroupCard.jsx
│   │       ├── GroupList.jsx
│   │       └── GroupCardStyled.jsx
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── styledComponents.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── styledComponents.js
│   │   ├── Groups/
│   │   │   ├── Groups.jsx
│   │   │   └── styledComponents.jsx
│   │   ├── GroupDetails/
│   │   │   └── GroupDetails.jsx
│   │   ├── CreateGroup/
│   │   │   ├── CreateGroup.jsx
│   │   │   └── styledComponents.jsx
│   │   ├── JoinGroup/
│   │   │   └── JoinGroup.jsx
│   │   ├── CreateDecision/
│   │   │   ├── CreateDecision.jsx
│   │   │   └── styledComponents.jsx
│   │   ├── SubmitConstraints/
│   │   │   └── SubmitConstraints.jsx
│   │   ├── DecisionDetail/
│   │   │   └── DecisionDetail.jsx
│   │   ├── Analytics/
│   │   │   ├── Analytics.jsx
│   │   │   └── styledComponents.js
│   │   ├── Profile/
│   │   │   └── Profile.jsx
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── styledComponents.js
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   ├── context/
│   │   ├── AuthContext.jsx         # Auth state management
│   │   └── GroupContext.jsx        # Group state management
│   ├── hooks/
│   │   ├── useAuth.js              # Auth hook
│   │   └── useGroups.js            # Groups hook
│   ├── services/
│   │   ├── api.js                  # Axios setup
│   │   ├── authService.js          # Auth API calls
│   │   ├── groupService.js         # Groups API calls
│   │   ├── decisionService.js      # Decisions API calls
│   │   └── chatService.js          # Chat API calls
│   ├── utils/
│   │   ├── formatters.js           # Formatting utilities
│   │   └── validators.js           # Form validators
│   ├── styles/
│   │   └── global.css              # Global styles
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Base styles
│   └── routes.jsx                  # Route configuration
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🎨 Styling System

### Styled-Components Usage

All components use **styled-components** for CSS-in-JS styling with:

- Dark theme configuration
- Responsive breakpoints
- Custom color palette
- Smooth transitions
- Reusable styled components

### Color Palette

```javascript
// Primary Colors
primary: #3B82F6 (Blue)
secondary: #8B5CF6 (Purple)
success: #10B981 (Green)
warning: #F59E0B (Amber)
danger: #EF4444 (Red)

// Neutral Colors
bg-dark: #0F172A
bg-darker: #020617
text-light: #F1F5F9
text-muted: #94A3B8
```

### Responsive Breakpoints

```javascript
mobile: 320px
tablet: 768px
desktop: 1024px
wide: 1280px
```

## 🔄 State Management

### AuthContext

```jsx
const {
  user, // Current user object
  isAuthenticated, // Boolean
  login, // Function
  register, // Function
  logout, // Function
  updateProfile, // Function
} = useAuth();
```

### GroupContext

```jsx
const {
  groups, // Array of user's groups
  selectedGroup, // Current group
  loading, // Loading state
  getGroups, // Fetch groups
  createGroup, // Create group
  joinGroup, // Join group
} = useGroups();
```

## 🌐 API Integration

### Service-Based Architecture

All API calls are abstracted into service files for better organization:

**authService.js**

```javascript
import authService from "./services/authService";

await authService.register(userData);
await authService.login(credentials);
await authService.logout();
await authService.getProfile();
await authService.updateProfile(profileData);
```

**groupService.js**

```javascript
import groupService from "./services/groupService";

await groupService.getMyGroups();
await groupService.createGroup(groupData);
await groupService.joinGroup(inviteCode);
await groupService.getGroupDetails(groupId);
await groupService.leaveGroup(groupId);
```

**decisionService.js**

```javascript
import decisionService from "./services/decisionService";

await decisionService.createDecision(decisionData);
await decisionService.submitConstraints(decisionId, constraints);
await decisionService.getDecisionResult(decisionId);
await decisionService.getGroupDecisions(groupId);
```

### Axios Configuration

- Automatic JWT token injection in Authorization headers
- Request/response interceptors
- Error handling with auto-redirect on 401
- Timeout configuration
- Base URL management

## 📄 Pages Documentation

### Public Pages

**Home (`/`)**

- Landing page with features overview
- Call-to-action buttons
- Feature highlights
- Benefits explanation

**Login (`/login`)**

- Email and password form
- Remember me option
- Link to registration
- Error message display

**Register (`/register`)**

- Name, email, password form
- Password strength indicator
- Form validation
- Link to login page

### Protected Pages

**Dashboard (`/dashboard`)**

- Overview statistics
- Recent groups
- Active decisions
- Quick action buttons

**Groups (`/groups`)**

- List of user's groups
- Group cards with info
- Create group button
- Join group option

**Group Details (`/groups/:id`)**

- Group name and description
- Members list
- Admin controls (for admins)
- Decisions history
- Create decision button

**Create Group (`/groups/create`)**

- Group name input
- Description textarea
- Create button

**Join Group (`/groups/join`)**

- Invite code input
- Join button
- Error handling

**Create Decision (`/groups/:id/decisions/create`)**

- Decision title
- Category selection
- Options input
- Submit button

**Submit Constraints (`/decisions/:id/submit`)**

- Budget range slider
- Location picker (optional)
- Dietary requirements checkboxes
- Preference tags input
- Must-haves and deal-breakers
- Submit button

**Decision Detail (`/decisions/:id`)**

- Decision title and status
- Selected option display
- Confidence score
- Reasoning explanation
- Per-user scores table
- Alternative options
- Fairness metrics

**Analytics (`/analytics`)**

- Personal statistics
- Group fairness metrics
- Decision history
- Monthly trends
- Satisfaction rate chart

**Profile (`/profile`)**

- User information
- Edit profile form
- Change password
- Account settings
- Logout button

**About (`/about`)**

- Project overview
- Features description
- Team information
- Technology stack

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Protected route components
- ✅ Automatic token refresh
- ✅ Auto-logout on token expiry
- ✅ XSS protection (React auto-escapes)
- ✅ CSRF token handling
- ✅ Secure localStorage usage
- ✅ Input validation
- ✅ HTTPS in production

## 🧩 Component Examples

### Button Component

```jsx
<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
  loading={isLoading}
  disabled={isDisabled}
>
  Click Me
</Button>
```

### Input Component

```jsx
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

### Card Component

```jsx
<Card hover className="custom-class">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### Modal Component

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title" size="md">
  <p>Modal content</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

## 🚀 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment Options

### Vercel (Recommended)

1. Connect GitHub repository
2. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Deploy from main branch
4. Automatic previews for PRs

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
4. Deploy

### GitHub Pages

```bash
# Add to package.json
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Run linter
npm run lint
```

## 🐛 Error Handling

### Global Error Handling

- Axios interceptors catch API errors
- Toast notifications for user feedback
- Auto-redirect on 401 (authentication errors)
- Form validation with inline errors
- Fallback pages for 404, 500 errors

### User Feedback

- Loading spinners
- Toast notifications (success, error, info)
- Form validation messages
- Modal confirmations
- Empty state messages

## 📱 Responsive Design

All pages are fully responsive:

**Mobile** (320px+)

- Single column layout
- Touch-optimized buttons
- Stacked navigation
- Full-width modals

**Tablet** (768px+)

- Two column layout where appropriate
- Side navigation drawer
- Grid layouts (2 columns)

**Desktop** (1024px+)

- Full sidebar navigation
- Multi-column layouts
- Optimal spacing and sizing
- Horizontal scrolling tables

## 🔧 Configuration

### Vite Configuration

- React plugin with Fast Refresh
- Path alias for imports (`@/` = `src/`)
- Environment variable handling
- Development server proxy

### Environment-Specific Settings

**Development**

```javascript
VITE_API_URL=http://localhost:5000
```

**Production**

```javascript
VITE_API_URL=https://api.yourdomain.com
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes
3. Test thoroughly
4. Submit pull request

### Code Style Guidelines

- Use functional components
- Follow React hooks best practices
- Use styled-components for styling
- Add comments for complex logic
- Test new features

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [Styled-Components Docs](https://styled-components.com)
- [Axios Documentation](https://axios-http.com)

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Madineni Hanumantha Rao**

- Email: madenenihanumanturao@gmail.com
- GitHub: [@hanuman2005](https://github.com/hanuman2005)
- National Level Hackathon Project

## 🙏 Acknowledgments

- React 18 for modern component architecture
- Styled-components for beautiful styling
- Vite for lightning-fast development
- React Router for seamless navigation

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Email**: madenenihanumanturao@gmail.com
- **Documentation**: See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)

---

**Built with ❤️ using React & Styled-Components**

_Last Updated: December 23, 2025_
