import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Edit2, Save, X } from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';
import {
  ProfileContainer,
  Header,
  Title,
  Subtitle,
  InfoBox,
  ProfileCard,
  ProfileRow,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileSection,
  ProfileLabel,
  ProfileValue,
  ProfileStatsGrid,
  ProfileStatCard,
  ProfileStatTitle,
  ProfileStatValue,
  ProfileEditActions,
  ProfileEditNote
} from './styledComponents.jsx';

/**
 * Profile Page
 * User profile settings and preferences
 */

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ name: formData.name });
      setEditing(false);
    } catch (error) {
      // Error handled by context
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setEditing(false);
  };

  return (
    <ProfileContainer>
      <Header>
        <Title>Profile Settings</Title>
        <Subtitle>Manage your account information</Subtitle>
      </Header>
      <InfoBox>
        {/* Profile Card */}
        <Card as={ProfileCard}>
          <ProfileRow>
            <ProfileAvatar src={user?.avatar} alt={user?.name} />
            <div>
              <ProfileName>{user?.name}</ProfileName>
              <ProfileEmail>{user?.email}</ProfileEmail>
            </div>
            {!editing && (
              <Button variant="outline" onClick={() => setEditing(true)}>
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            )}
          </ProfileRow>

          {editing ? (
            <ProfileSection>
              <Input
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                icon={Mail}
              />
              <ProfileEditNote>Email cannot be changed at this time</ProfileEditNote>
              <ProfileEditActions>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSave}
                  loading={loading}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </ProfileEditActions>
            </ProfileSection>
          ) : (
            <ProfileSection>
              <div>
                <ProfileLabel>Name</ProfileLabel>
                <ProfileValue>{user?.name}</ProfileValue>
              </div>
              <div>
                <ProfileLabel>Email</ProfileLabel>
                <ProfileValue>{user?.email}</ProfileValue>
              </div>
              <div>
                <ProfileLabel>Member Since</ProfileLabel>
                <ProfileValue>{new Date(user?.createdAt).toLocaleDateString()}</ProfileValue>
              </div>
            </ProfileSection>
          )}
        </Card>

        {/* Account Stats */}
        <ProfileStatsGrid>
          <Card as={ProfileStatCard}>
            <ProfileStatTitle>Total Groups</ProfileStatTitle>
            <ProfileStatValue>-</ProfileStatValue>
          </Card>
          <Card as={ProfileStatCard}>
            <ProfileStatTitle>Decisions Made</ProfileStatTitle>
            <ProfileStatValue>-</ProfileStatValue>
          </Card>
          <Card as={ProfileStatCard}>
            <ProfileStatTitle>Fairness Score</ProfileStatTitle>
            <ProfileStatValue>-</ProfileStatValue>
          </Card>
        </ProfileStatsGrid>
      </InfoBox>
    </ProfileContainer>
  );
};

export default Profile;