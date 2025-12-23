import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './pages/auth/ProtectedRoute';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Groups from './pages/Groups/Groups';
import GroupDetails from './pages/GroupDetails/GroupDetails';
import CreateGroup from './pages/CreateGroup/CreateGroup';
import JoinGroup from './pages/JoinGroup/JoinGroup';
import PendingInvites from './pages/PendingInvites/PendingInvites';
import DecisionTemplates from './pages/DecisionTemplates/DecisionTemplates';
import CreateDecision from './pages/CreateDecision/CreateDecision';
import DecisionDetail from './pages/DecisionDetail/DecisionDetail';
import SubmitConstraints from './pages/SubmitConstraints/SubmitConstraints';
import GroupChat from './pages/GroupChat/GroupChat';
import Profile from './pages/Profile/Profile';
import Analytics from './pages/Analytics/Analytics';
import AISuggestions from './pages/AISuggestions/AISuggestions';
import ConflictResolutionUI from './pages/ConflictResolution/ConflictResolutionUI';
import NotFound from './pages/NotFound/NotFound';

/**
 * Main App Component
 * Sets up routing and global providers
 */

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#363636',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

        {/* Navigation */}
        <Navbar />

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Group Routes */}
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/create"
            element={
              <ProtectedRoute>
                <CreateGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/join"
            element={
              <ProtectedRoute>
                <JoinGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invites"
            element={
              <ProtectedRoute>
                <PendingInvites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute>
                <GroupDetails />
              </ProtectedRoute>
            }
          />

          {/* Group Chat Route */}
          <Route
            path="/groups/:id/chat"
            element={
              <ProtectedRoute>
                <GroupChat />
              </ProtectedRoute>
            }
          />

          {/* Decision Routes */}
          <Route
            path="/decisions/templates"
            element={
              <ProtectedRoute>
                <DecisionTemplates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:groupId/decisions/create"
            element={
              <ProtectedRoute>
                <CreateDecision />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decisions/:id"
            element={
              <ProtectedRoute>
                <DecisionDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decisions/:id/submit"
            element={
              <ProtectedRoute>
                <SubmitConstraints />
              </ProtectedRoute>
            }
          />

          {/* Analytics Route */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* AI Suggestions Route */}
          <Route
            path="/ai-suggestions"
            element={
              <ProtectedRoute>
                <AISuggestions />
              </ProtectedRoute>
            }
          />

          {/* Conflict Resolution Route */}
          <Route
            path="/conflict-resolution"
            element={
              <ProtectedRoute>
                <ConflictResolutionUI />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {/* Footer */}
        <Footer />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;