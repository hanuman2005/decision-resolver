# Group Decision Resolver - Frontend

## 🎨 Overview

Modern React frontend for Group Decision Resolver with beautiful UI, smooth animations, and seamless backend integration.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animations (optional)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running on port 5000

### Setup Steps

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env if needed
```

4. **Start development server**
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── common/     # Generic UI components
│   │   └── auth/       # Auth-related components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── context/        # React Context providers
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

## 🎯 Key Features

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT
- ✅ Protected routes
- ✅ Persistent sessions (localStorage)
- ✅ Auto-redirect on token expiry

### Group Management
- ✅ Create groups with invite codes
- ✅ Join groups via invite code
- ✅ View group members
- ✅ Admin controls (promote, remove members)
- ✅ Leave/delete groups

### Decision Making
- ✅ Create decision sessions
- ✅ Submit constraints (budget, location, preferences)
- ✅ Real-time processing status
- ✅ View decision results with reasoning
- ✅ Fairness insights
- ✅ Decision history

### UI/UX
- ✅ Fully responsive design
- ✅ Beautiful gradient backgrounds
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling with toasts
- ✅ Modal dialogs
- ✅ Card-based layouts

## 🎨 Components

### Common Components

#### Button
```jsx
<Button 
  variant="primary" 
  size="md" 
  loading={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

**Variants:** `primary`, `secondary`, `success`, `danger`, `outline`, `ghost`  
**Sizes:** `sm`, `md`, `lg`

#### Input
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  icon={Mail}
  required
/>
```

#### Card
```jsx
<Card hover padding className="custom-class">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### Modal
```jsx
<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

#### Loading
```jsx
<Loading text="Loading..." fullScreen={false} />
```

## 🔄 State Management

Uses React Context API for global state:

### AuthContext
```jsx
const { user, login, logout, register, updateProfile } = useAuth();
```

**Available methods:**
- `login(credentials)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `updateProfile(data)` - Update user profile
- `refreshUser()` - Refresh user data
- `isAuthenticated` - Boolean auth status

## 🌐 API Integration

### Services Architecture

All API calls are abstracted into service files:

**authService.js**
```javascript
import authService from './services/authService';

// Login
await authService.login({ email, password });

// Register
await authService.register({ name, email, password });

// Get profile
await authService.getProfile();
```

**groupService.js**
```javascript
import groupService from './services/groupService';

// Create group
await groupService.createGroup({ name, description });

// Join group
await groupService.joinGroup(inviteCode);

// Get my groups
await groupService.getMyGroups();
```

**decisionService.js**
```javascript
import decisionService from './services/decisionService';

// Create decision
await decisionService.createDecision(decisionData);

// Submit constraints
await decisionService.submitConstraints(decisionId, constraints);

// Get decision results
await decisionService.getDecisionById(decisionId);
```

### Axios Configuration

- Automatic JWT token injection
- Response/request interceptors
- Error handling with auto-redirect on 401
- Base URL configuration

## 🎭 Pages

### Public Pages
- **Home (/)** - Landing page with features
- **Login (/login)** - User login form
- **Register (/register)** - User registration

### Protected Pages
- **Dashboard (/dashboard)** - User overview
- **Groups (/groups)** - List of user's groups
- **Group Detail (/groups/:id)** - Group details and members
- **Create Group (/groups/create)** - Group creation form
- **Join Group (/groups/join)** - Join with invite code
- **Create Decision (/groups/:id/decisions/create)** - Start new decision
- **Decision Detail (/decisions/:id)** - View decision results
- **Submit Constraints (/decisions/:id/submit)** - Add user constraints
- **Profile (/profile)** - User profile settings

## 🎨 Styling

### Tailwind Configuration

**Custom Colors:**
```javascript
primary: { 50-900 } // Blue shades
success: { 50-600 } // Green
warning: { 50-600 } // Orange
error: { 50-600 }   // Red
```

**Custom Shadows:**
```css
shadow-soft   // Subtle shadow
shadow-strong // Pronounced shadow
```

**Animations:**
```css
animate-fade-in
animate-slide-up
animate-pulse-slow
```

### Responsive Design

All components are fully responsive with breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output will be in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

**Vercel:**
1. Connect GitHub repository
2. Set environment variables
3. Deploy from main branch

**Netlify:**
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

**Environment Variables to Set:**
- `VITE_API_URL` - Backend API URL

## 🔧 Configuration Files

### vite.config.js
- React plugin
- Path aliases (@/ for src/)
- Proxy for API calls in development

### tailwind.config.js
- Custom color palette
- Extended animations
- Custom utilities

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 📱 Features by Page

### Dashboard
- Quick stats overview
- Recent groups
- Active decisions
- Quick actions

### Group Detail
- Member list with avatars
- Invite code display
- Decision history
- Create new decision button
- Admin controls

### Create Decision
- Decision title & category
- Option input (restaurants, activities)
- Location data
- Tags and metadata

### Submit Constraints
- Budget range slider
- Location picker
- Dietary requirements checkboxes
- Preference tags
- Must-haves and deal-breakers

### Decision Results
- Winning option display
- Satisfaction rate visualization
- Reasoning explanation
- Alternative options
- Per-user scores
- Fairness adjustments shown

## 🐛 Error Handling

### Global Error Handling
- Axios interceptors catch all API errors
- Toast notifications for user feedback
- Auto-redirect on authentication errors
- Form validation with inline errors

### Loading States
- Skeleton screens
- Spinner animations
- Disabled buttons during submission
- Full-screen overlays for critical operations

## 🎯 Best Practices

### Component Structure
```jsx
// 1. Imports
import { useState } from 'react';
import Component from './Component';

// 2. Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // 3. Hooks
  const [state, setState] = useState();
  
  // 4. Event handlers
  const handleClick = () => {};
  
  // 5. Effects
  useEffect(() => {}, []);
  
  // 6. Render
  return <div>...</div>;
};

// 7. Export
export default MyComponent;
```

### State Management
- Use Context for global state (auth, theme)
- Local state for component-specific data
- Lift state up when sharing between siblings

### API Calls
- Always use try-catch
- Show loading states
- Handle errors gracefully
- Use service abstractions

## 🔐 Security

- ✅ JWT tokens stored in localStorage
- ✅ Auto token injection in requests
- ✅ Protected route component
- ✅ Auto-logout on token expiry
- ✅ Input sanitization
- ✅ XSS protection via React

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ }
    }
  }
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`

### Creating New Services
```javascript
// src/services/myService.js
import api from './api';

const myService = {
  getData: async () => {
    return await api.get('/endpoint');
  }
};

export default myService;
```

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run linter
npm run lint
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License

## 👨‍💻 Author

Your Name - National Level Hackathon Project

---

**Built with ❤️ using React & Tailwind CSS**