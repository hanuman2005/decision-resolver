import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Users, ArrowLeft, Plus, Copy, Check, 
  Clock, CheckCircle, Calendar, Shield, UserPlus, MessageSquare 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import decisionService from '../../services/decisionService';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import InviteModal from '../../components/common/InviteModal';
import toast from 'react-hot-toast';
import {
  GroupDetailsContainer,
  Header,
  TabRow,
  TabButton,
  FlexBetween,
  FlexStart,
  AvatarBox,
  Title,
  Description,
  InfoRow,
  InfoItem,
  InviteCodeBox,
  Section,
  TabContent,
  MemberCard,
  MemberInfo,
  MemberAvatar,
  MemberName,
  MemberEmail,
  MemberRole,
  MemberJoined,
  ModalContent,
  ModalText,
  ModalSubText,
  ModalButtonRow,
  BackButton,
  CardBox,
  ActionsRow,
  InviteLabel,
  InviteSubLabel,
  InviteActions,
  HeaderTextColumn,
  InviteTextColumn,
  InfoText,
  EmptyCard,
  EmptyTitle,
  EmptyDescription,
  DecisionHeaderRow,
  DecisionTitle,
  DecisionStatus,
  DecisionCategory,
  DecisionInfoRow,
  DecisionStatusColumn,
  DecisionStatusIconCompleted,
  DecisionStatusIconProcessing,
  MembersTitle,
  ModalStrong,
  TabContentColumn,
  MemberTextColumn,
  YouSpan,
  MemberActions,
  DecisionTextColumn
} from './styledComponents.jsx';

/**
 * Group Detail Page
 * Shows group info, members, and decisions
 */

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('decisions'); // decisions | members

  useEffect(() => {
    loadGroupData();
  }, [id]);

  const loadGroupData = async () => {
    try {
      const [groupRes, decisionsRes] = await Promise.all([
        groupService.getGroupById(id),
        decisionService.getGroupDecisions(id, { limit: 10 }),
      ]);
      setGroup(groupRes.data.group);
      setDecisions(decisionsRes.data.decisions || []);
    } catch (error) {
      toast.error('Failed to load group details');
      navigate('/groups');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    setCopied(true);
    toast.success('Invite code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveGroup = async () => {
    try {
      await groupService.leaveGroup(id);
      toast.success('Left group successfully');
      navigate('/groups');
    } catch (error) {
      toast.error(error.message || 'Failed to leave group');
    }
    setShowLeaveModal(false);
  };



  if (loading) {
    return <Loading text="Loading group..." />;
  }

  if (!group) {
    return null;
  }

  return (
    <GroupDetailsContainer>
      <Header>
          <BackButton onClick={() => navigate('/groups')}>
            <ArrowLeft />
            Back to Groups
          </BackButton>
      </Header>
      <CardBox>
        <FlexBetween>
          <FlexStart>
            <AvatarBox>
              <Users />
            </AvatarBox>
            <HeaderTextColumn>
              <Title>{group.name}</Title>
              <Description>{group.description || 'No description'}</Description>
              <InfoRow>
                <InfoItem>
                    <Users />
                  <InfoText>{group.memberCount} members</InfoText>
                </InfoItem>
                <InfoItem>
                    <Calendar />
                  <InfoText>Created {new Date(group.createdAt).toLocaleDateString()}</InfoText>
                </InfoItem>
              </InfoRow>
            </HeaderTextColumn>
          </FlexStart>
          <ActionsRow>
            <Link to={`/groups/${id}/chat`} style={{ textDecoration: 'none' }}>
              <Button variant="secondary">
                <MessageSquare className="w-4 h-4" />
                Group Chat
              </Button>
            </Link>
            {group.isAdmin && (
              <>
                <Link to={`/groups/${id}/decisions/create`} style={{ textDecoration: 'none' }}>
                  <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    New Decision
                  </Button>
                </Link>
                <Button variant="secondary" onClick={() => setShowInviteModal(true)}>
                  <UserPlus className="w-4 h-4" />
                  Invite Members
                </Button>
              </>
            )}
            {!group.isAdmin && (
              <Link to={`/groups/${id}/decisions/create`} style={{ textDecoration: 'none' }}>
                <Button variant="primary">
                  <Plus className="w-4 h-4" />
                  New Decision
                </Button>
              </Link>
            )}
          </ActionsRow>
        </FlexBetween>
        {/* Invite Code */}
        <Section>
          <FlexBetween>
            <InviteTextColumn>
              <InviteLabel>Invite Code</InviteLabel>
              <InviteSubLabel>Share this code to invite new members</InviteSubLabel>
            </InviteTextColumn>
            <InviteActions>
              <InviteCodeBox>{group.inviteCode}</InviteCodeBox>
                  <Button variant="outline" size="sm" onClick={handleCopyInviteCode}>
                    {copied ? (
                      <>
                        <Check />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy />
                        Copy
                      </>
                    )}
                  </Button>
            </InviteActions>
          </FlexBetween>
        </Section>
      </CardBox>

      {/* Tabs */}
      <TabRow>
        <TabButton
          aria-selected={activeTab === 'decisions'}
          onClick={() => setActiveTab('decisions')}
        >
          Decisions
        </TabButton>
        <TabButton
          aria-selected={activeTab === 'members'}
          onClick={() => setActiveTab('members')}
        >
          Members
        </TabButton>
      </TabRow>

      {/* Tab Content */}
      {activeTab === 'decisions' && (
        <TabContent>
          {decisions.length === 0 ? (
            <EmptyCard>
              <Clock className="w-16 h-16 text-gray-400" />
              <EmptyTitle>No decisions yet</EmptyTitle>
              <EmptyDescription>Create your first decision to get started</EmptyDescription>
              <Link to={`/groups/${id}/decisions/create`}>
                <Button variant="primary">
                  <Plus className="w-4 h-4" />
                  Create Decision
                </Button>
              </Link>
            </EmptyCard>
          ) : (
            <TabContentColumn>
              {decisions.map((decision) => (
                <Link key={decision._id} to={`/decisions/${decision._id}`}>
                  <Card hover>
                    <FlexBetween>
                      <DecisionTextColumn>
                        <DecisionHeaderRow>
                          <DecisionTitle>{decision.title}</DecisionTitle>
                          <DecisionStatus status={decision.status}>{decision.status}</DecisionStatus>
                        </DecisionHeaderRow>
                        <DecisionCategory>Category: {decision.category}</DecisionCategory>
                        <DecisionInfoRow>
                          <InfoText>{decision.constraints?.length || 0} / {group.memberCount} submitted</InfoText>
                          <InfoText>Created {new Date(decision.createdAt).toLocaleDateString()}</InfoText>
                        </DecisionInfoRow>
                      </DecisionTextColumn>
                      <DecisionStatusColumn>
                        {decision.status === 'completed' ? (
                          <DecisionStatusIconCompleted />
                        ) : (
                          <DecisionStatusIconProcessing />
                        )}
                      </DecisionStatusColumn>
                    </FlexBetween>
                  </Card>
                </Link>
              ))}
            </TabContentColumn>
          )}
        </TabContent>
      )}


      {activeTab === 'members' && (
        <Card>
          <MembersTitle>Group Members</MembersTitle>
          <TabContentColumn>
            {group.members.map((member) => (
              <MemberCard key={member.userId._id}>
                <MemberInfo>
                  <MemberAvatar src={member.userId.avatar} alt={member.userId.name} />
                  <MemberTextColumn>
                    <MemberName>
                      {member.userId.name}
                      {member.userId._id === user.id && (
                        <YouSpan>(You)</YouSpan>
                      )}
                    </MemberName>
                    <MemberEmail>{member.userId.email}</MemberEmail>
                  </MemberTextColumn>
                </MemberInfo>
                <MemberActions>
                  {member.role === 'admin' && (
                          <MemberRole><Shield />Admin</MemberRole>
                  )}
                  <MemberJoined>Joined {new Date(member.joinedAt).toLocaleDateString()}</MemberJoined>
                </MemberActions>
              </MemberCard>
            ))}
          </TabContentColumn>
          {/* Leave Group */}
          <Section>
            <Button variant="danger" onClick={() => setShowLeaveModal(true)}>
              Leave Group
            </Button>
          </Section>
        </Card>
      )}

      {/* Leave Group Modal */}
      <Modal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        title="Leave Group"
      >
        <ModalContent>
          <ModalText>
            Are you sure you want to leave <ModalStrong>{group.name}</ModalStrong>?
          </ModalText>
          <ModalSubText>
            You'll need an invite code to rejoin this group.
          </ModalSubText>
          <ModalButtonRow>
            <Button variant="outline" fullWidth onClick={() => setShowLeaveModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" fullWidth onClick={handleLeaveGroup}>
              Leave Group
            </Button>
          </ModalButtonRow>
        </ModalContent>
      </Modal>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteModal
          groupId={id}
          onClose={() => setShowInviteModal(false)}
          onSuccess={() => {
            setShowInviteModal(false);
            loadGroupData();
          }}
        />
      )}
    </GroupDetailsContainer>
  );
};

export default GroupDetails;