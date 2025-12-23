import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Key } from 'lucide-react';
import groupService from '../../services/groupService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card.jsx';
import toast from 'react-hot-toast';
import {
  JoinGroupContainer,
  PageWrapper,
  BackButton,
  Header,
  HeaderIcon,
  Title,
  Subtitle,
  ExampleBox,
  ExampleCode,
  InfoBox,
  InfoTitle,
  InfoList,
  InfoListItem,
  InfoListIcon,
  ButtonRow,
  HelpText,
  HelpButton
} from './styledComponents.jsx';

/**
 * Join Group Page
 * Form to join an existing group using invite code
 */

const JoinGroup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setInviteCode(value);
    if (error) setError('');
  };

  const validateCode = () => {
    if (!inviteCode) {
      setError('Invite code is required');
      return false;
    }
    if (inviteCode.length !== 8) {
      setError('Invite code must be 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCode()) return;

    setLoading(true);
    try {
      const response = await groupService.joinGroup(inviteCode);
      toast.success(`Successfully joined ${response.data.group.name}!`);
      navigate(`/groups/${response.data.group._id}`);
    } catch (error) {
      setError(error.message || 'Failed to join group');
      toast.error(error.message || 'Failed to join group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <JoinGroupContainer>
      <PageWrapper>
        {/* Back Button */}
        <BackButton onClick={() => navigate('/groups')}>
          <ArrowLeft className="w-4 h-4" />
          Back to Groups
        </BackButton>

        {/* Header */}
        <Header>
          <HeaderIcon>
            <UserPlus className="w-8 h-8 text-white" />
          </HeaderIcon>
          <Title>Join a Group</Title>
          <Subtitle>Enter the invite code shared with you to join an existing group</Subtitle>
        </Header>

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Invite Code"
              type="text"
              value={inviteCode}
              onChange={handleChange}
              error={error}
              placeholder="e.g., ABC12XYZ"
              maxLength={8}
              required
              icon={Key}
              style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'monospace', letterSpacing: '0.2em' }}
            />
            <Subtitle>The invite code is 8 characters long (letters and numbers)</Subtitle>

            {/* Example */}
            <ExampleBox>
              <InfoTitle>Where do I find the invite code?</InfoTitle>
              <Subtitle>The group admin should have shared an 8-character code with you. It looks like this:</Subtitle>
              <ExampleCode>ABC12XYZ</ExampleCode>
            </ExampleBox>

            {/* Info Box */}
            <InfoBox>
              <InfoTitle>What happens when I join?</InfoTitle>
              <InfoList>
                <InfoListItem>
                  <InfoListIcon>✓</InfoListIcon>
                  <span>You'll become a member of the group</span>
                </InfoListItem>
                <InfoListItem>
                  <InfoListIcon>✓</InfoListIcon>
                  <span>You can participate in group decisions</span>
                </InfoListItem>
                <InfoListItem>
                  <InfoListIcon>✓</InfoListIcon>
                  <span>Your preferences will be considered fairly</span>
                </InfoListItem>
              </InfoList>
            </InfoBox>

            {/* Submit Button */}
            <ButtonRow>
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => navigate('/groups')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                fullWidth
                loading={loading}
              >
                Join Group
              </Button>
            </ButtonRow>
          </form>
        </Card>

        {/* Help Text */}
        <HelpText>Don't have an invite code?</HelpText>
        <HelpButton onClick={() => navigate('/groups/create')}>
          Create your own group instead
        </HelpButton>
      </PageWrapper>
    </JoinGroupContainer>
  );
};

export default JoinGroup;