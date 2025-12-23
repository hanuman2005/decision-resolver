import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Search, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  
  @media (max-width: 640px) {
    max-width: 90%;
    max-height: 90vh;
  }
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, #f0f4ff, #f5f3ff);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const SearchContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled(Search)`
  width: 1.125rem;
  height: 1.125rem;
  color: #94a3b8;
  flex-shrink: 0;
`;

const UsersList = styled.div`
  max-height: 400px;
  overflow-y: auto;

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

const UserItem = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
`;

const UserAvatarFallback = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  border: 2px solid #e2e8f0;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;

  p {
    margin: 0;
    font-weight: 500;
    color: #1e293b;
    font-size: 0.95rem;
  }

  span {
    display: block;
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 0.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const InviteButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 73, 89, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #64748b;

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

const MessageInput = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 60px;
  max-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  color: #1e293b;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
  }
`;

export const InviteModal = ({ groupId, onClose, onSuccess }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [inviting, setInviting] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/invites/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setUsers(data.data.users);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!selectedUser) {
      toast.error('Please select a user');
      return;
    }

    setInviting(true);
    try {
      const response = await fetch('/api/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          groupId,
          userId: selectedUser._id,
          message
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Invite sent successfully!');
        setSelectedUser(null);
        setMessage('');
        setSearchQuery('');
        setUsers([]);
        onSuccess && onSuccess();
      } else {
        // Handle specific error codes
        if (response.status === 409) {
          if (data.message.includes('already a member')) {
            toast.error(`${selectedUser.name} is already a member of this group`);
          } else if (data.message.includes('already sent')) {
            toast.error(`Invite already sent to ${selectedUser.name}`);
          } else {
            toast.error(data.message || 'User conflict - cannot invite');
          }
        } else {
          toast.error(data.message || 'Failed to send invite');
        }
      }
    } catch (error) {
      console.error('Invite error:', error);
      toast.error('Failed to send invite');
    } finally {
      setInviting(false);
    }
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Invite Members</h2>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </Header>

        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {loading && <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />}
        </SearchContainer>

        {selectedUser ? (
          <div style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                {selectedUser.avatar ? (
                  <UserAvatar src={selectedUser.avatar} alt={selectedUser.name} />
                ) : (
                  <UserAvatarFallback>{getUserInitials(selectedUser.name)}</UserAvatarFallback>
                )}
                <div>
                  <p style={{ margin: '0 0 0.25rem 0' }}>{selectedUser.name}</p>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{selectedUser.email}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
              >
                Change User
              </button>
            </div>

            <MessageInput
              placeholder="Add a personal message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        ) : (
          <UsersList>
            {users.length === 0 && searchQuery.length >= 2 && !loading && (
              <EmptyState>
                <p>No users found matching "{searchQuery}"</p>
              </EmptyState>
            )}
            {users.length === 0 && searchQuery.length === 0 && (
              <EmptyState>
                <p>Start typing to search for users</p>
              </EmptyState>
            )}
            {users.map((user) => (
              <UserItem
                key={user._id}
                onClick={() => setSelectedUser(user)}
              >
                {user.avatar ? (
                  <UserAvatar src={user.avatar} alt={user.name} />
                ) : (
                  <UserAvatarFallback>{getUserInitials(user.name)}</UserAvatarFallback>
                )}
                <UserInfo>
                  <p>{user.name}</p>
                  <span>{user.email}</span>
                </UserInfo>
              </UserItem>
            ))}
          </UsersList>
        )}

        {selectedUser && (
          <Footer>
            <CancelButton onClick={() => { setSelectedUser(null); setMessage(''); }}>
              Cancel
            </CancelButton>
            <InviteButton onClick={handleInvite} disabled={inviting}>
              {inviting ? (
                <>
                  <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Sending...
                </>
              ) : (
                'Send Invite'
              )}
            </InviteButton>
          </Footer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default InviteModal;
