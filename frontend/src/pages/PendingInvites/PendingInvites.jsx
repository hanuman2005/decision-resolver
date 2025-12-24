import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Check, X } from 'lucide-react';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';
import api from '../../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    color: #ffffff;
    font-size: clamp(1.5rem, 5vw, 2rem);
    flex: 1;
    font-weight: 700;
  }
`;

const BackLink = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const InviteCard = styled(Card)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const InviteContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InviterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #cbd5e1;
`;

const AvatarFallback = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  border: 2px solid #cbd5e1;
`;

const TextContent = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.25rem 0;
    color: #1e293b;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;

    &.group-name {
      color: #3b82f6;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }
`;

const Message = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  padding: 0.75rem;
  background: white;
  border-left: 3px solid #3b82f6;
  border-radius: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 640px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;

  svg {
    width: 3rem;
    height: 3rem;
    color: #cbd5e1;
    margin: 0 auto 1rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
`;

import api from '../../services/api';

const PendingInvites = () => {
  const navigate = useNavigate();
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvites();
  }, []);

  const loadInvites = async () => {
    try {
      const response = await api.get('/invites/pending');
      if (response.data.success) {
        setInvites(response.data.data.invites);
      }
    } catch (error) {
      console.error('Load invites error:', error);
      toast.error('Failed to load invites');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvite = async (inviteId) => {
    try {
      const response = await api.put(`/invites/${inviteId}/accept`);
      if (response.data.success) {
        toast.success('Invite accepted! You can now access the group.');
        // Remove the accepted invite from the list
        setInvites(invites.filter(i => i._id !== inviteId));
        // Navigate to the group
        setTimeout(() => {
          navigate(`/groups/${response.data.data.group._id}`);
        }, 1000);
      } else {
        toast.error(response.data.message || 'Failed to accept invite');
      }
    } catch (error) {
      console.error('Accept invite error:', error);
      toast.error('Failed to accept invite');
    }
  };

  const handleDeclineInvite = async (inviteId) => {
    try {
      const response = await api.put(`/invites/${inviteId}/decline`);
      if (response.data.success) {
        toast.success('Invite declined');
        setInvites(invites.filter(i => i._id !== inviteId));
      } else {
        toast.error(response.data.message || 'Failed to decline invite');
      }
    } catch (error) {
      console.error('Decline invite error:', error);
      toast.error('Failed to decline invite');
    }
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header>
        <BackLink onClick={() => navigate(-1)}>
          <ArrowLeft />
        </BackLink>
        <h1>Pending Invites</h1>
      </Header>

      {invites.length === 0 ? (
        <EmptyState>
          <p>No pending invites</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            When someone invites you to a group, you'll see it here
          </p>
        </EmptyState>
      ) : (
        invites.map((invite) => (
          <InviteCard key={invite._id}>
            <InviteContent>
              <InviterInfo>
                {invite.from.avatar ? (
                  <Avatar src={invite.from.avatar} alt={invite.from.name} />
                ) : (
                  <AvatarFallback>{getUserInitials(invite.from.name)}</AvatarFallback>
                )}
                <TextContent>
                  <h3>{invite.from.name}</h3>
                  <p>{invite.from.email}</p>
                  <p className="group-name">invited you to "{invite.group.name}"</p>
                </TextContent>
              </InviterInfo>
            </InviteContent>

            {invite.message && <Message>"{invite.message}"</Message>}

            <ActionButtons>
              <ActionButton
                variant="primary"
                onClick={() => handleAcceptInvite(invite._id)}
              >
                <Check size={16} />
                Accept
              </ActionButton>
              <ActionButton
                variant="outline"
                onClick={() => handleDeclineInvite(invite._id)}
              >
                <X size={16} />
                Decline
              </ActionButton>
            </ActionButtons>
          </InviteCard>
        ))
      )}
    </Container>
  );
};

export default PendingInvites;
