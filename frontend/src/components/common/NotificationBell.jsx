import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, CheckCircle, Users, TrendingUp, UserPlus, Clock } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import styled from 'styled-components';

const NotificationBellContainer = styled.div`
  position: relative;
`;

const BellButton = styled.button`
  position: relative;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: all 0.3s ease;

  &:hover {
    color: #3b82f6;
    background-color: #f1f5f9;
    border-radius: 0.5rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 9999px;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
`;

const DropdownContainer = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 24rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  z-index: 50;
  max-height: 36rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    width: 20rem;
  }
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(to right, #f0f4ff, #f5f3ff);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-weight: bold;
    color: #1e293b;
    margin: 0;
    font-size: 1.125rem;
  }

  p {
    color: #64748b;
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
  }
`;

const MarkAllButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const NotificationList = styled.div`
  overflow-y: auto;
  max-height: 30rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 0.25rem;

    &:hover {
      background: #94a3b8;
    }
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;

  svg {
    width: 3rem;
    height: 3rem;
    color: #cbd5e1;
    margin: 0 auto 0.75rem;
  }

  p {
    color: #64748b;
    margin: 0;
  }

  .subtitle {
    color: #94a3b8;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const NotificationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  hover:background-color: #f8fafc;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
  }

  background-color: ${props => props.$unread ? '#eff6ff' : 'white'};

  display: flex;
  gap: 0.75rem;
`;

const IconBox = styled.div`
  flex-shrink: 0;
  margin-top: 0.25rem;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  font-size: 0.875rem;
`;

const Message = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
  word-break: break-word;
`;

const Time = styled.p`
  color: #94a3b8;
  font-size: 0.75rem;
  margin: 0.5rem 0 0 0;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 0;
  margin-top: 0.25rem;

  &:hover {
    color: #94a3b8;
  }
`;

const UnreadIndicator = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 9999px;
  flex-shrink: 0;
  margin-top: 0.5rem;
`;

const getIcon = (type) => {
  switch (type) {
    case 'member_joined':
      return <UserPlus className="w-5 h-5 text-blue-500" />;
    case 'constraint_submitted':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'decision_ready':
      return <TrendingUp className="w-5 h-5 text-purple-500" />;
    case 'group_invite':
      return <Users className="w-5 h-5 text-orange-500" />;
    case 'decision_created':
      return <Clock className="w-5 h-5 text-indigo-500" />;
    default:
      return <Bell className="w-5 h-5 text-slate-500" />;
  }
};

const getNavigationPath = (notification) => {
  const { type, data } = notification;
  
  switch (type) {
    case 'group_invite':
      return '/invites';
    case 'member_joined':
    case 'decision_created':
    case 'member_left':
      return data?.groupId ? `/groups/${data.groupId}` : '/groups';
    case 'decision_ready':
    case 'constraint_submitted':
      return data?.decisionId ? `/groups/${data.groupId}/decisions/${data.decisionId}` : '/groups';
    default:
      return '/dashboard';
  }
};

const formatTimestamp = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const NotificationBell = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, loading } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id);
    const path = getNavigationPath(notification);
    navigate(path);
    setIsOpen(false);
  };

  return (
    <NotificationBellContainer>
      <BellButton onClick={() => setIsOpen(!isOpen)} title="Notifications">
        <Bell />
        {unreadCount > 0 && (
          <Badge>{unreadCount > 9 ? '9+' : unreadCount}</Badge>
        )}
      </BellButton>

      {isOpen && (
        <>
          <Backdrop onClick={() => setIsOpen(false)} />
          <DropdownContainer>
            <Header>
              <div>
                <h3>Notifications</h3>
                <p>{unreadCount} unread</p>
              </div>
              {notifications.length > 0 && (
                <MarkAllButton onClick={markAllAsRead}>
                  Mark all read
                </MarkAllButton>
              )}
            </Header>

            <NotificationList>
              {loading ? (
                <EmptyState>
                  <p>Loading...</p>
                </EmptyState>
              ) : notifications.length === 0 ? (
                <EmptyState>
                  <Bell />
                  <p>No notifications yet</p>
                  <p className="subtitle">You'll see updates here when something happens</p>
                </EmptyState>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    $unread={!notification.read}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <IconBox>{getIcon(notification.type)}</IconBox>
                    <Content>
                      <Title>{notification.title}</Title>
                      <Message>{notification.message}</Message>
                      <Time>{formatTimestamp(notification.createdAt)}</Time>
                    </Content>
                    <CloseButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification._id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </CloseButton>
                    {!notification.read && <UnreadIndicator />}
                  </NotificationItem>
                ))
              )}
            </NotificationList>
          </DropdownContainer>
        </>
      )}
    </NotificationBellContainer>
  );
};

export default NotificationBell;
